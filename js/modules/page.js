'use strict';

var Pagination = require('./pagination.js');
var Lightbox = require('./lightbox.js');
var Slideshow = require('./slideshow.js');
var Utility = require('./utility.js');

var modules = {
  pagination: Pagination,
  lightbox: Lightbox,
  slideshow: Slideshow
};

var util = Utility.getInstance();
var $ = util.$$();

function Page() {
  var els = $('[data-module]');

  els.forEach(function(el) {
    var key = el.getAttribute('data-module').toLowerCase(),
        params = JSON.parse(el.getAttribute('data-params').replace(/'/, '"')),
        constructor = modules[key],
        instance;

    if (constructor) {
      instance = new constructor(el, params);
    }
  });

  return {
    els: els
  };
}

module.exports = Page;
