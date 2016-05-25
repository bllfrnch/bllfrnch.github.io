'use strict';

var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var Pagination = require('../pagination/module.js');
var Lightbox = require('../lightbox/module.js');
var util = Utility.getInstance();
var $ = util.$;

var LIGHTBOX_DESTROY_EVENT = 'lightbox:closeButtonClicked';
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

  this.pics = $('picture img', this.el);
  this.current = this.pics[0];

  paginationEl = $('.pagination ul', this.el)[0];
  pagination = new Pagination(paginationEl, {
    id: this.id,
    imgs: this.pics.map(function(img){ return img.src; })
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


MultiPic.prototype.unbindImgEvent = function() {
  this.current.parentNode.removeEventListener('click',
      this.lightboxRequested);
};

/**
 *
 */
MultiPic.prototype.bindImgEvent = function() {
  this.current.parentNode.addEventListener('click',
      this.lightboxRequested.bind(this));
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
  console.log('picChangeRequested');
  this.changePic(picIndex);
};

MultiPic.prototype.lightboxRequested = function(ev) {
  ev.preventDefault();
  var wrapper = $('.lightbox')[0],
    modal = $('.lightbox-modal', wrapper)[0],
    frag = this.el.cloneNode(true),
    lightbox = new Lightbox(wrapper, { frag: frag });
};

/**
 * [lightboxDestroyRequested description]
 * @return {[type]} [description]
 */
MultiPic.prototype.lightboxDestroyRequested = function() {

};


/**
 * [changePic description]
 * @return {[type]} [description]
 */
MultiPic.prototype.changePic = function(idx) {
  console.log('changePic');
  this.current.parentNode.style.display = 'none';
  this.unbindImgEvent();
  this.current = this.pics[idx];
  this.current.parentNode.style.display = 'block';
  this.bindImgEvent();
}

module.exports = MultiPic;
