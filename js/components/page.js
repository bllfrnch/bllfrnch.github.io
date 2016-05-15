'use strict';

var Pagination = require('./pagination.js');
var Lightbox = require('./lightbox.js');
var Slideshow = require('./slideshow.js');
var Utility = require('./utility.js');

function Page() {
  var components = {
      pagination: Pagination,
      lightbox: Lightbox,
      slideshow: Slideshow
    },
    util = Utility.getInstance(),
    $ = util.$,
    els = $('[data-component]');

  els.forEach(function(el) {
    var key = el.getAttribute('data-component').toLowerCase(),
        params = JSON.parse(el.getAttribute('data-params').replace(/'/, '"')),
        constructor = components[key],
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
