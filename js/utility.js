'use strict';

module.exports = (function() {
  var instance;

  /**
   * Returns a new Utility object.
   * @return {Utility}
   */
  function init() {
    return new Utility();
  }

  /**
   * Utility class.
   * @constructor
   */
  function Utility() {};

  /**
   * Takes an array-like thing, e.g., a node list, and returns it as a proper
   * array.
   * @param  {Array-like} list The array-like list.
   * @return {Array} The resulting array.
   */
  Utility.prototype.toArray = function(list) {
    return Array.prototype.slice.call(list, 0);
  };

  /**
   * General purpose query selector function.
   * @param  {String} selector A string with one or more selectors separated by
   * commas.
   * @param  {[type]} context The context elements from which to begin searching
   * for child elements. Defaults to the document element if nothing is passed.
   * @return {Array<Element>} Returns an array of element nodes.
   */
  Utility.prototype.$ = function(selector, context) {
    var u = Utility.prototype;
    if (!context) {
      context = document;
    }
    // use the prototype so util.$ can be aliased.
    // TODO: clean this up.
    return u.toArray(context.querySelectorAll(selector));
  };

  /**
   * Extend an object.
   * @param  {Object} )    {               var obj [description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  Utility.prototype.extend = function() {
    var obj = {},
      args = this.toArray(arguments).reverse();

    if (args.length == 1) {
      return args[0];
    } else if (args.length > 1) {
      return args.forEach(function(arg) {
        for (var key in arg) {
          obj[key] = arg[key];
        }
      });
    }
  };

  // Module is implemented as a singleton with no public access to the Utility
  // class istself, only a pre-existing instance.
  return {
    /**
     * Return a singleton instance of the Utility class.
     * @return {Utility} Utility object.
     */
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  }
})();
