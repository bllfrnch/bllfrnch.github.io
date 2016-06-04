'use strict';

var Page = require('./components/page/module.js');

function init() {
  document.addEventListener('DOMContentLoaded', function(ev) {
    var page = new Page.getInstance();
  });
}

init();
