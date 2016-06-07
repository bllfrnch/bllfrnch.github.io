'use strict';

var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var util = Utility.getInstance();
var $ = util.$;

/**
 * StickyHeader class. Creates a sticky header/navigation module for use at top
 * of all pages.
 * @constructor
 * @extends {Component}
 * @param {Element} el     The container element for the pagination.
 * @param {[type]} params Parameters for the sticky header class.
 */
function StickyHeader(el, params) {
  Component.call(this, el, params);
  this.initialize();
}

util.inherit(StickyHeader, Component);
