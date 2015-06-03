##DEPRECATED!

Use [Google's official NodeJS API client](https://github.com/google/google-api-nodejs-client) instead. See [here](https://github.com/google/google-api-nodejs-client/blob/master/examples/customsearch.js) for example usage.

node-googlecustomsearch
=======================

Rate-limited Google Custom Search wrapper using promises

Installation
------------

    npm install googlecustomsearch

Usage
-----

    var GoogleCustomSearch = require('googlecustomsearch');
    var cse = new GoogleCustomSearch({/* key: ..., cx: ... */});
    cse.search('node-googlecustomsearch').done(function (data) { console.log(data.items); });
    cse.search('carl sagan', {siteSearch: 'wikipedia.org'});
