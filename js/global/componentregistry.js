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
   * @param {[type]} parentId  [description]
   * @throws {Error} If component is of type Page and no parentId is passed.
   */
  ComponentRegistry.prototype.add = function(component, parentId) {
    var parent;

    if (parentId === undefined) {
      throw new Error('Components can not be added to the registry without a ' +
        'parentId.');
    }

    parent = this.get(parentId) || this._registry;

    if (parentId === null) {
      parent['instance'] = component;
      parent['children'] = {};
    } else {
      parent.children[component.id] = {
        instance: component,
        children: {}
      };
    }
  };

  ComponentRegistry.prototype.update = function(component, oldId) {

  };

  ComponentRegistry.prototype.get = function(id, contextObject) {
    var current = this._registry || contextObject,
      result;

    for (var key in current) {
      if (current.hasOwnProperty(key) && key === id) {
        return current[id];
      }
    }

    for (var obj in current.children) {
      result = this.get(id, obj);
      if (result) {
        break;
      }
    }
    return result;
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
