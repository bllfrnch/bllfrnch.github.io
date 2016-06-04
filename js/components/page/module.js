'use strict';

var Pagination = require('../pagination/module.js');
var Lightbox = require('../lightbox/module.js');
var MultiPic = require('../multipic/module.js');
var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var util = Utility.getInstance();
var $ = util.$

module.exports = (function() {
  var instance;

  function Page() {
    this.initialize();
  }

  function initSingleton() {
    return new Page();
  }

  Page.prototype.initialize = function() {
    this.els = $('[data-component]');
    this.instances = {

    };
    this.bootstrap();
  };


  // want a hierarchical data structure with instances; this will be where we
  // add and remove event listeners and clean stuff up.

  // [
  //   {
  //     '78647tf': [
  //       {
  //         instance: instance,
  //         children: [
  //           {

  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {

  //   }
  // ];

  Page.prototype.bootstrap = function() {
    var components = {
      pagination: Pagination,
      lightbox: Lightbox,
      multipic: MultiPic
    };

    this.els.forEach(function(el) {
      var key = el.getAttribute('data-component').toLowerCase(),
        params = JSON.parse(el.getAttribute('data-params').replace(/'/, '"')),
        constructor = components[key],
        instance;

      // now we need to add these to a hierarchy rather than a flat list
      if (constructor) {
        this.instances[key] = new constructor(el, params);
      }
    }, this);
  };

  Page.prototype.registerComponent = function(instance, parent) {

  };

  Page.prototype.getComponent = function(id) {

  };

  Page.prototype.removeComponent = function(id) {

  };

  return {
    getInstance: function() {
      if (!instance) {
        instance = initSingleton();
      }
      return instance;
    }
  };
})();
