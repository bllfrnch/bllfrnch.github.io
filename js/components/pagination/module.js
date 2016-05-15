'use strict';

var Utility = require('../../utility.js');
var radio = require('radio');
var util = Utility.getInstance();
var $ = util.$;

var SELECTED_CLASS = 'selected';
var CLICK_EVENT = 'pagination:pageLinkClicked';

/**
 * Pagination class. Creates a pagination component. Publishes events when page
 * link elements are clicked and updates classes.
 * @constructor
 * @param {Element} el     The container element for the pagination.
 * @param {[type]} params Parameters for the pagination class.
 */
function Pagination(el, params) {
  this.el = el;
  this.params = params;
  this.pageLinks = $('.page-link');
  this.current = this.toggleSelected(this.pageLinks[0]);

  this.pageLinks.forEach(function(link) {
    link.addEventListener('click', this.clickHandler.bind(this));
  }, this);
}

/**
 * [clickHandler description]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
Pagination.prototype.clickHandler = function(event) {
  var el = event.target,
      page = this.getRequestedPage(el);

  event.preventDefault();

  if (el.classList.contains(SELECTED_CLASS)) {
    return;
  }

  [this.current, el].forEach(function(el) {
    this.toggleSelected(el);
  }, this);

  this.current = el;

  radio(CLICK_EVENT).broadcast({ el: el, page: page });
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
