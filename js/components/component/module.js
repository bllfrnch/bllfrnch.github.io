'use strict';

var Utility = require('../../global/utility.js');
var ComponentRegistry = require('../../global/componentregistry.js');
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
  this.register();
  this.setInitialized();
};

/**
 * If no id exists on the specified element, sets an id attribute
 * and returns it, or if the id already exists, returns the existing id.
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
 * Returns the id of the element.
 * @param  {Element} el The element whose id will be returned.
 * @return {String} The id.
 */
Component.prototype.getId = function(el) {
  var id;
  if (!el) throw new Error('getId called without value for element parameter.');
  id = el === document? 'document' : el.getAttribute('id');
  return id;
};

/**
 * Given a component element id, return the element.
 * @param  {String} id The id of the element.
 * @return {Node} Return either the document or the HTML element.
 */
Component.prototype.getEl = function(id) {
  if (!id) throw new Error('getEl called without value for id parameter.');
  return id === 'document' ? document: $('#' + id)[0];
};

/**
 * An abstract method that is meant to be overridden by subclasses.
 */
Component.prototype.bindEvents = function() {};

/**
 * [register description]
 * @param  {[type]} parentId [description]
 * @return {[type]}          [description]
 */
Component.prototype.register = function() {
  var componentRegistry = ComponentRegistry.getInstance();
  componentRegistry.add(this);
};

/**
 * [sendUp description]
 * @return {[type]} [description]
 */
Component.prototype.sendUp = function(data) {

};

/**
 * [sendDown description]
 * @return {[type]} [description]
 */
Component.prototype.sendDown = function(data) {

};

/**
 * Sends a message to all components.
 * @return {[type]} [description]
 */
Component.prototype.shout = function(data) {

};

/**
 * Sends a message
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Component.prototype.sendMessage = function(data) {

};

/**
 * Adds an event listener to an element.
 * @param {Node} el Element to which listener will be added.
 * @param {String} ev Event type, e.g., 'click'.
 * @param {Function} fn The function to bind to the event.
 * @param {Boolean} capture Whether to use capture. Optional, and defaults to
 * false.
 */
Component.prototype.addListener = function(el, ev, fn) {
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
 * Unbinds all events for the component.
 */
Component.prototype.unbindEvents = function() {
  var listeners, fn, el;
  for (var id in this.listeners) {
    listeners = this.listeners[id];
    for (var ev in listeners) {
      fn = listeners[ev][0];
      el = this.getEl(id);
      el.removeEventListener(ev, fn);
    }
  }
};

/**
 * Finalize. WIP.
 */
Component.prototype.finalize = function() {
  this.unbindEvents();
};

/**
 * [setInitialized description]
 */
Component.prototype.setInitialized = function() {
  var el = this.el,
    id = this.id;

  radio(COMPONENT_INITIALIZED_EVENT).broadcast({ el: el, id: id });
};

module.exports = Component;
