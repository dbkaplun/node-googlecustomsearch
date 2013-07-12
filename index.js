var extend = require('extend');
var RateLimiter = require('limiter').RateLimiter;
var Q = require('q');
var request = require('request');

function GoogleCustomSearch (opts) {
  var self = this;

  self.opts = extend(true, {
    alt: 'json',
    rateLimit: {calls: 100, duration: 'day'}
  }, opts);

  self.limiter = new RateLimiter(self.opts.rateLimit.calls, self.opts.rateLimit.duration);
  delete self.opts.rateLimit;

  self.request = function (opts) {
    return Q
      .ninvoke(self.limiter, 'removeTokens', 1)
      .then(Q.nfbind(request, {url: 'https://www.googleapis.com/customsearch/v1', qs: extend(true, null, self.opts, opts)}))
      .spread(function (res) {
        var data = JSON.parse(res.body);
        if (data.error) {
          if (data.error.message === "Daily Limit Exceeded") { self.limiter.removeTokens(self.limiter.getTokensRemaining()); }
          throw extend(new Error(), data.error);
        }
        return data;
      });
  };

  self.search = function (q, opts) {
    return self.request(extend({q: q}, opts));
  };
}

exports = module.exports = GoogleCustomSearch;
