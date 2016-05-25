var Utility = require('../../utility.js');
var util = Utility.getInstance();
var radio = require('radio');
var uuid = require('node-uuid');

var COMPONENT_INITIALIZED_EVENT;

function Component(el, params) {
  this.uuid = uuid.v1();
  this.radio = radio;
  this.el = el;
  this.params = params;
  this.listeners = [];
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
 * [bindEvents description]
 * @return {[type]} [description]
 */
Component.prototype.bindEvents = function() {};

Component.prototype.addEventListener = function(eventName, callback, context) {

};

Component.prototype.removeEventListener = function(eventName) {};

Component.prototype.unbindEvents = function() {

};

/**
 * [setInitialized description]
 */
Component.prototype.setInitialized = function() {
  radio(COMPONENT_INITIALIZED_EVENT).broadcast({

  });
};

module.exports = Component;
