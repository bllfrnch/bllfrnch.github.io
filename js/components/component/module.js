var Utility = require('../../utility.js');
var util = Utility.getInstance();
var radio = require('radio');
var shortid = require('shortid');

var COMPONENT_INITIALIZED_EVENT;

function Component(el, params) {
  this.id = shortid.generate();
  this.radio = radio;
  this.el = el;
  this.params = params;
  this.listeners = {};
}

/**
 * [initialize description]
 * @return {[type]} [description]
 */
Component.prototype.initialize = function() {
  this.bindEvents();
  this.setInitialized();
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
  var f = fn.bind(this);
  capture = capture || false;

  if (this.listeners[el] === undefined) {
    this.listeners[el] = {};
  }

  if (this.listeners[el][ev] === undefined) {
    this.listeners[el][ev] = [];
  }

  this.listeners[el][ev].push(f, capture);
  el.addEventListener(ev, f, capture);
};

/**
 * [removeListeners description]
 * @param  {[type]} el [description]
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
Component.prototype.removeListeners = function(el, ev) {
  if (el in this.listeners && ev in this.listeners[el]) {
    this.listeners[el][ev].forEach(function(listener) {
      el.removeEventListener(ev, listener);
    });
  }
};

/**
 * [unbindEvents description]
 * @return {[type]} [description]
 */
Component.prototype.unbindEvents = function() {
  var listeners, fn;
  for (var el in this.listeners) {
    listeners = this.listeners[el];
    for (var ev in listeners) {
      fn = listeners[ev];
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
