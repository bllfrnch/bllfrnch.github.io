'use strict';

var Pagination = require('../components/pagination/module.js');
var Lightbox = require('../components/lightbox/module.js');
var MultiPic = require('../components/multipic/module.js');
var StickyHeader = require('../components/stickyheader/module.js');

module.exports = (function() {
  var instance,
    components = {
      pagination: Pagination,
      lightbox: Lightbox,
      multipic: MultiPic,
      stickyheader: StickyHeader
    };

  /**
   * Returns a new Utility object.
   * @return {Utility}
   */
  function initSingleton() {
    return new ComponentFactory();
  }

  /**
   * Component class.
   * @constructor
   */
  function ComponentFactory() {};

  /**
   * [createComponent description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  ComponentFactory.prototype.createComponent = function(type, el, params) {
    return new components[type](el, params);
  };

  return {
    /**
     * Return a singleton instance of the Utility class.
     * @return {Utility} Utility object.
     */
    getInstance: function() {
      if (!instance) {
        instance = initSingleton();
      }
      return instance;
    }
  }
})();
