'use strict';

var Page = require('./components/page/module.js');
var ComponentRegistry = require('./global/componentregistry.js');

function init() {
  var registry = ComponentRegistry.getInstance();

  document.addEventListener('DOMContentLoaded', function(ev) {
    var page = new Page.getInstance();
    document['org'] = {
      billf: {
        registry: registry
      }
    };
  });
}

init();
