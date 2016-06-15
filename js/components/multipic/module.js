'use strict';

var Utility = require('../../global/utility.js');
var Component = require('../component/module.js');
var Pagination = require('../pagination/module.js');
var Lightbox = require('../lightbox/module.js');
// var render = require('./template.dot');
var util = Utility.getInstance();
var $ = util.$;

var CLICK_EVENT = 'pagination:pageLinkClicked';

/**
 * MultiPic class. Creates a multipic component. Listens for events from the
 * a pagination instance and responds accordingly.
 * @constructor
 * @extends {Component}
 * @param {Element} el     The container element for the pagination.
 * @param {[type]} params Parameters for the pagination class.
 */
function MultiPic(el, params) {
  var pagination,
      paginationEl;

  Component.call(this, el, params);

  this.current = this.params.imgs[0];

  paginationEl = $('.pagination ul', this.el)[0];
  pagination = new Pagination(paginationEl, {
    id: this.id,
    imgs: this.params.imgs.map(function(img){ return img.src; })
  });

  this.initialize();
}

util.inherit(MultiPic, Component);

/**
 * [bindEvents description]
 * @public
 * @return {[type]} [description]
 */
MultiPic.prototype.bindEvents = function() {
  this.bindImgEvent();
  this.radio(CLICK_EVENT).subscribe(this.picChangeRequested.bind(this));
};


/**
 * Returns the current image node.
 * @return {Element} The image element currently on display.
 */
MultiPic.prototype.getCurrentImg = function() {
  return $('img[src="' + this.current.src + '"]', this.el)[0];
};

/**
 * [unbindImgEvent description]
 * @return {[type]} [description]
 */
MultiPic.prototype.unbindImgEvent = function() {
  this.removeListeners(this.getCurrentImg().parentNode, 'click');
};

/**
 *
 */
MultiPic.prototype.bindImgEvent = function() {
  this.addListener(this.getCurrentImg().parentNode, 'click',
      this.lightboxRequested);
};

/**
 * [pageChangeRequested description]
 * @return {[type]} [description]
 */
MultiPic.prototype.picChangeRequested = function() {
  var data = arguments[0],
    id = data.id,
    picIndex;

  if (id !== this.id) {
    return;
  }

  picIndex = data.page;
  this.changePic(picIndex);
};

/**
 * [lightboxRequested description]
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
MultiPic.prototype.lightboxRequested = function(ev) {
  ev.preventDefault();
  var imgs = this.params.imgs,
    current = this.current,
    wrapper = $('.lightbox')[0],
    lightbox = new Lightbox(wrapper, {
      imgs: imgs,
      current: current
    });
};

/**
 * [lightboxDestroyRequested description]
 * @return {[type]} [description]
 */
MultiPic.prototype.lightboxDestroyRequested = function() {
  this.lightbox.finalize();
};


/**
 * [changePic description]
 * @return {[type]} [description]
 */
MultiPic.prototype.changePic = function(idx) {
  this.getCurrentImg().parentNode.style.display = 'none';
  this.unbindImgEvent();
  this.current = this.params.imgs[idx];
  this.getCurrentImg().parentNode.style.display = 'block';
  this.bindImgEvent();
}

module.exports = MultiPic;
