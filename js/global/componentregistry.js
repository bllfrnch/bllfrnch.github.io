module.exports = (function() {
  var instance;

  function ComponentRegistry() {
    this._registry = {};
  }

  function initSingleton() {
    return new ComponentRegistry();
  }

  /**
   * Adds a component to the registry. If parentId isn't specified, then the
   * component is added to the top level. Only components of type Page can be
   * added without a parentId.
   * TODO: maintain a data structure for fast access to members aside from just
   * the registry
   * @param {[type]} component [description]
   */
  ComponentRegistry.prototype.add = function(component) {
    var id = component.id;
    this._registry[id] = component;
  };

  ComponentRegistry.prototype.update = function(component, oldId) {

  };

  /**
   * [get description]
   * @param  {[type]} id            [description]
   * @param  {[type]} contextObject [description]
   * @return {[type]}               [description]
   */
  ComponentRegistry.prototype.get = function(id) {
    return this._registry[id];
  };

  ComponentRegistry.prototype.remove = function(id) {

  };

  return {
    getInstance: function() {
      if (!instance) {
        instance = initSingleton()
      }
      return instance;
    }
  };
})();
