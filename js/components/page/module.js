'use strict';

var Utility = require('../../global/utility.js');
var Component = require('../component/module.js');
var ComponentRegistry = require('../../global/componentregistry.js');
var ComponentFactory = require('../../global/componentfactory.js');
var util = Utility.getInstance();
var $ = util.$

module.exports = (function() {
  var componentRegistry = ComponentRegistry.getInstance(),
    instance;

  /**
   * Page class. Creates a page component. Bootstraps and registers all
   * components that are declared on the page and provides an API for
   * components to register, retrieve, and remove them later. Extends Component,
   * and this.el is set to document.
   * @constructor
   * @extends {Component}
   * @param {Element} el The container element for the pagination.
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
    componentRegistry.add(this, null);
    this.bootstrap();
  };

  /**
   * [bootstrap description]
   * TODO: Make this hierarchical
   * @return {[type]} [description]
   */
  Page.prototype.bootstrap = function() {
    var componentEls = [];
    this.els.forEach(function(el) {
      var children = $('[data-component]', el),
          comp;
      if (!children.length) {
        comp = this.instantiateComponent(el);
        componentRegistry.add(comp, this.id);
      }
    }, this);
  };

  /**
   * [instantiateComponent description]
   * @param  {[type]} el [description]
   * @return {[type]}    [description]
   */
  Page.prototype.instantiateComponent = function(el) {
    var type = el.getAttribute('data-component').toLowerCase(),
        params = JSON.parse(el.getAttribute('data-params')),
        componentFactory = ComponentFactory.getInstance(),
        instance;

    if (type) {
      instance = componentFactory.createComponent(type, el, params);
      componentRegistry.add(instance, this.id);
    }

    // throw error if no instance could be instantiated.
    if (!instance) {
      throw new Error('Instance not instantiated for element ', el);
    }

    return instance;
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
