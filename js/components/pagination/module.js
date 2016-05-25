'use strict';

var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var render = require('./template.dot');
var util = Utility.getInstance();
var $ = util.$;

var SELECTED_CLASS = 'selected';
var CLICK_EVENT = 'pagination:pageLinkClicked';


/**
 * Pagination class. Creates a pagination component. Publishes events when page
 * link elements are clicked and updates classes.
 * @constructor
 * @extends {Component}
 * @param {Element} el     The container element for the pagination.
 * @param {[type]} params Parameters for the pagination class.
 */
function Pagination(el, params) {
  Component.call(this, el, params);

  this.multiPicId = params.uuid;
  this.pageLinks = this.createDom();
  this.current = this.toggleSelected(this.pageLinks[0]);
  this.initialize();
}

util.inherit(Pagination, Component);

Pagination.prototype.bindEvents = function() {
  this.pageLinks.forEach(function(link) {
    link.addEventListener('click', this.clickHandler.bind(this));
  }, this);
};

/**
 * [createDom description]
 * @return {[type]} [description]
 */
Pagination.prototype.createDom = function() {
  var html = render(this.params);
  this.el.innerHTML = html;
  return $('.page-link', this.el);
};

/**
 * [clickHandler description]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
Pagination.prototype.clickHandler = function(event) {
  var el = event.target,
    page = this.getRequestedPage(el),
    uuid = this.multiPicId;

  event.preventDefault();

  if (el.classList.contains(SELECTED_CLASS)) {
    return;
  }

  [this.current, el].forEach(function(el) {
    this.toggleSelected(el);
  }, this);

  this.current = el;

  this.radio(CLICK_EVENT).broadcast({ el: el, page: page, uuid: uuid});
};

/**
 * [toggleSelected description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Pagination.prototype.toggleSelected = function(el) {
  el.classList.toggle(SELECTED_CLASS);
  return el;
};

/**
 * [getRequestedPage description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Pagination.prototype.getRequestedPage = function(el) {
  for (var i = 0, len = this.pageLinks.length; i < len; i++) {
    if (el === this.pageLinks[i]) {
      return i;
    }
  }
};

module.exports = Pagination;
