'use strict';

var Utility = require('../../utility.js');
var util = Utility.getInstance();
var radio = require('radio');
var shortid = require('shortid');
var $ = util.$;

var COMPONENT_INITIALIZED_EVENT;

function Component(el, params) {
  this.id = shortid.generate();
  this.radio = radio;
  this.el = el;
  this.params = params;
  this.listeners = {};
}

/**
 * Initializes the component.
 */
Component.prototype.initialize = function() {
  this.setId(this.el, this.id);
  this.bindEvents();
  this.setInitialized();
};

/**
 * If no id exists on the specified element, sets an id attribute
 * and returns it, or if the id already exists, returns the id.
 * @param {ELement} el The element on which to set the id attribute.
 * @param {Number} id Optional id parameter. If not specified, the method
 * generates an id, otherwise, it uses the passed value.
 * @return {[type]} The id.
 */
Component.prototype.setId = function(el, id) {
  id = id? id: shortid.generate();
  el.setAttribute('id', id);
  return id;
};

/**
 * Given a component element id, return the element.
 * @param  {String} id The id of the element.
 * @return {Node}    Return either the document or the HTML element.
 */
Component.prototype.getEl = function(id) {
  return id === 'document' ? document: $('#' + id)[0];
};

/**
 * [getId description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Component.prototype.getId = function(el) {
  var id = el === document? 'document' : el.getAttribute('id');
  return id;
};

/**
 * An abstract method that is meant to be overridden but subclasses.
 * @return {[type]} [description]
 */
Component.prototype.bindEvents = function() {};

/**
 * [addListener description]
 * @param {[type]}   el      [description]
 * @param {[type]}   ev      [description]
 * @param {Function} fn      [description]
 * @param {[type]}   capture [description]
 */
Component.prototype.addListener = function(el, ev, fn, capture) {
  var f = fn.bind(this),
    capture = capture || false,
    id = this.getId(el) || this.setId(el);

  if (this.listeners[id] === undefined) {
    this.listeners[id] = {};
  }

  if (this.listeners[id][ev] === undefined) {
    this.listeners[id][ev] = [];
  }

  this.listeners[id][ev].push(f, capture);
  el.addEventListener(ev, f, capture);
};


/**
 * Removes all listeners for a given element of a specific type.
 * @param  {Element} el The element from which events will be removed.
 * @param  {String} ev The event type, e.g., 'click'.
 */
Component.prototype.removeListeners = function(el, ev) {
  var id = this.getId(el);

  if (!id) throw new Error('No id set for element ', el);

  if (id in this.listeners && ev in this.listeners[id]) {
    this.listeners[id][ev].forEach(function(listener) {
      el.removeEventListener(ev, listener);
    });
  }
};

/**
 * [unbindEvents description]
 * @return {[type]} [description]
 */
Component.prototype.unbindEvents = function() {
  var listeners, fn, el;
  for (var id in this.listeners) {
    listeners = this.listeners[id];
    for (var ev in listeners) {
      fn = listeners[ev];
      el = this.getEl(id);
      el.removeEventListener(ev, fn);
    }
  }
};

Component.prototype.finalize = function() {
  this.unbindEvents();
};

/**
 * [setInitialized description]
 */
Component.prototype.setInitialized = function() {
  radio(COMPONENT_INITIALIZED_EVENT).broadcast({

  });
};

module.exports = Component;
