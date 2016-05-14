'use strict';

module.exports = (function() {
  var instance;

  /**
   * [init description]
   * @return {[type]} [description]
   */
  function init() {
    return new Utility();
  }

  /**
   * [Utility description]
   */
  function Utility() {};

  /**
   * [toArray description]
   * @param  {[type]} nodeSet [description]
   * @return {[type]}         [description]
   */
  Utility.prototype.toArray = function(nodeSet) {
    return Array.prototype.slice.call(nodeSet, 0);
  };

  /**
   * [$ description]
   * @param  {[type]} selector [description]
   * @param  {[type]} context  [description]
   * @return {[type]}          [description]
   */
  Utility.prototype.$ = function(selector, context) {
    if (!context) {
      context = document;
    }
    return this.toArray(context.querySelectorAll(selector));
  };

  Utility.prototype.$$ = function() {
    return this.$.bind(this);
  };

  return {
    /**
     * [getInstance description]
     * @return {[type]} [description]
     */
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  }
})();
