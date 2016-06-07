'use strict';

module.exports = (function() {
  var instance;

  /**
   * Returns a new Utility object.
   * @return {Utility}
   */
  function initSingleton() {
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
   * Extend an object. This function can be called with any number of arguments.
   * @param  {Object} obj Arbitrary number of object parameters.
   * @return {Object} The object after extension, which is a new object, not a
   * reference to any of the passed parameters.
   * TODO: revisit this to make sure objects aren't being overwritten
   * unwittingly.
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


  /**
   * [inherit description]
   * @param  {[type]} Child  [description]
   * @param  {[type]} Parent [description]
   * @return {[type]}        [description]
   */
  Utility.prototype.inherit = function(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.super = Parent.prototype;
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
        instance = initSingleton();
      }
      return instance;
    }
  }
})();
