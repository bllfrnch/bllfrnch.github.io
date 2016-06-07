'use strict';

var Pagination = require('../pagination/module.js');
var Lightbox = require('../lightbox/module.js');
var MultiPic = require('../multipic/module.js');
var StickyHeader = require('../stickyheader/module.js');
var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var util = Utility.getInstance();
var $ = util.$

module.exports = (function() {
  var instance;
  var components = {
    pagination: Pagination,
    lightbox: Lightbox,
    multipic: MultiPic,
    stickyheader: StickyHeader
  };

  /**
   * Page class. Creates a page component. Bootstraps and registers all
   * components that are declared on the page and provides an API for
   * components to register, retrieve, and remove them later. Extends Component,
   * and this.el is set to document.
   * @constructor
   * @extends {Component}
   * @param {Element} el     The container element for the pagination.
   * @param {[type]} params Parameters for the pagination class.
   */
  function Page(params) {
    Component.call(this, document, params);
    this.initialize();
  }

  util.inherit(Page, Component);

  function initSingleton() {
    return new Page();
  }

  /**
   * [initialize description]
   * @return {[type]} [description]
   */
  Page.prototype.initialize = function() {
    this.els = $('[data-component]');
    // The registry of component records.
    this.registry = {};
    this.registry = {
      instance: this,
      children: {}
    };
    this.bootstrap();
  };

  // want a hierarchical data structure with instances; this will be where we
  // add and remove event listeners and clean stuff up.

    // {
    //   '78647tf': {
    //     instance: instance,
    //     children: {
    //       '23523dd': {
    //         instance: instance,
    //         children: {}
    //       }
    //     }
    //   }
    // };


  /**
   * [bootstrap description]
   * @return {[type]} [description]
   */
  Page.prototype.bootstrap = function() {
    var componentEls = [];
    this.els.forEach(function(el) {
      var children = $('[data-component]', el),
          comp;
      if (!children.length) {
        comp = this.instantiateComponent(el);
        this.registerComponent(comp, this.id);
      }
    }, this);



    // this.els.forEach(function(el) {
    //   var key = el.getAttribute('data-component').toLowerCase(),
    //       params = JSON.parse(el.getAttribute('data-params')),
    //       constructor = components[key],
    //       instance;

    //   // now we need to add these to a hierarchy rather than a flat list
    //   if (constructor) {
    //     //if (x) {}
    //     var instance = new constructor(el, params);
    //     this.registry[instance.id] = {
    //       instance: instance,
    //       children: []
    //     }
    //   }
    // }, this);
  };

  /**
   * [instantiateComponent description]
   * @param  {[type]} el [description]
   * @return {[type]}    [description]
   */
  Page.prototype.instantiateComponent = function(el) {
    var key = el.getAttribute('data-component').toLowerCase(),
        params = JSON.parse(el.getAttribute('data-params')),
        constructor = components[key],
        instance;

    if (constructor) {
      instance = new constructor(el, params);
      this.registerComponent(instance)
    }

    // throw error if no instance could be instantiated.
    if (!instance) {
      throw new Error('Instance not instantiated for element ', el);
    }

    return instance;
  };

  /**
   * Adds a component record to the components registry. If parent is
   * specified, then the component record is added as a child of the parent.
   * Otherwise, it's added at the root level.
   * @param  {Component} component The component instance to add to the registry.
   * @param  {String} parent The id of the component that will be component's
   * parent. Optional, if not specified, will be added to the root.
   * @return {[type]}          [description]
   */
  Page.prototype.registerComponent = function(component, parentId) {
    var parent = this.getComponent(parentId) || this.registry;

    parent.children[component.id] = {
      instance: component,
      children: {}
    }
  };

  /**
   * Given a component id, return the component record (a POJO) from the
   * registry.
   * @param  {String} id [description]
   * @return {Object}    [description]
   */
  Page.prototype.getComponent = function(id) {

  };


  /**
   * Given a component record id, return the component record (a POJO).
   * @param  {String} id The id of the component record.
   * @return {Object} The component record.
   */
  Page.prototype.removeComponent = function(id) {

  };

  return {
    /**
     * Returns the page singleton.
     * @return {Page} An instance of type Page, which inherits from Component,
     * but provides other methods for bootstrapping and registering instances
     * so they can communicate with each other.
     */
    getInstance: function() {
      if (!instance) {
        instance = initSingleton();
      }
      return instance;
    }
  };
})();
