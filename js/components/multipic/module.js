'use strict';

var radio = require('radio');
var uuid = require('node-uuid');
var Pagination = require('../pagination/module.js');
var Utility = require('../../utility.js');
var util = Utility.getInstance();
var $ = util.$;

var CLICK_EVENT = 'pagination:pageLinkClicked';

/**
 * MultiPic class. Creates a multipic component. Listens for events from the
 * a pagination instance and responds accordingly.
 * @constructor
 * @param {Element} el     The container element for the pagination.
 * @param {[type]} params Parameters for the pagination class.
 */
function MultiPic(el, params) {
  var pagination,
      paginationEl;

  this.uuid = uuid.v1();
  this.el = el;
  this.params = params;
  this.pics = $('picture img', this.el);
  this.current = this.pics[0];

  paginationEl = $('.pagination ul', this.el)[0];
  pagination = new Pagination(paginationEl, {
    uuid: this.uuid,
    imgs: this.pics.map(function(img){ return img.src })
  });

  this.bindEvents()
}

/**
 * [bindEvents description]
 * @public
 * @return {[type]} [description]
 */
MultiPic.prototype.bindEvents = function() {
  radio(CLICK_EVENT).subscribe(this.picChangeRequested.bind(this));
};

/**
 * [pageChangeRequested description]
 * @return {[type]} [description]
 */
MultiPic.prototype.picChangeRequested = function() {
  var data = arguments[0],
    uuid = data.uuid,
    picIndex;

  if (uuid !== this.uuid) {
    return;
  }

  picIndex = data.page;
  console.log('picChangeRequested');
  this.changePic(picIndex);
};

/**
 * [changePic description]
 * @return {[type]} [description]
 */
MultiPic.prototype.changePic = function(idx) {
  console.log('changePic');
  this.current.parentNode.style.display = 'none';
  this.current = this.pics[idx];
  this.current.parentNode.style.display = 'block';
}

module.exports = MultiPic;
