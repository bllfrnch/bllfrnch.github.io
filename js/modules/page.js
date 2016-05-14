var Pagination = require('./pagination.js');
var Lightbox = require('./lightbox.js');
var Slideshow = require('./slideshow.js');
var Utility = require('./utility.js');

var util = Utility.getInstance();
var $ = util.$$();

function Page() {
  var els = $('[data-module]');

  els.forEach(function(el) {
    var moduleName = el.getAttribute('data-module');


  });

  return {
    els: els
  };
}

module.exports = Page;
