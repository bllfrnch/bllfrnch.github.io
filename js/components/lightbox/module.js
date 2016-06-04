'use strict';

var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var Pagination = require('../pagination/module.js');
var util = Utility.getInstance();
var $ = util.$;

var body, frag;

function Lightbox(el, params) {
  var frag = params.frag;
  Component.call(this, el, params);
  body = $('body')[0];
  this.modal = $('.lightbox-modal', this.el)[0];
  this.scrub(frag);
  this.frag = this.modal.appendChild(frag);
  this.open();
  this.closeButton = $('.lightbox-close', this.el)[0];
  this.pagination = $('.pagination ul', this.el)[0];
  this.initialize();
};

util.inherit(Lightbox, Component);

/**
 * [initialize description]
 * @return {[type]} [description]
 */
Lightbox.prototype.initialize = function() {
  var context = this.el, id = this.id;
  Component.prototype.initialize.call(this);
  new Pagination(this.pagination, {
    id: id,
    imgs: this.params.imgs
  });
};

/**
 * [scrub description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Lightbox.prototype.scrub = function(el) {
  var els = $('[id]', el);
  els.forEach(function(el) {
    el.removeAttribute('id');
  });
};

/**
 * [bindEvents description]
 * @return {[type]} [description]
 */
Lightbox.prototype.bindEvents = function() {
  this.addListener(this.closeButton, 'click', this.closeLightboxRequested);
  this.addListener(document, 'keyup', function(ev) {
    if (ev.which && ev.which === 27) {
      this.closeLightboxRequested();
    }
  });
};

/**
 * [closeLightboxRequested description]
 * @return {[type]} [description]
 */
Lightbox.prototype.closeLightboxRequested = function() {
  this.close();
};

/**
 * [open description]
 * @return {[type]} [description]
 */
Lightbox.prototype.open = function() {
  body.classList.add('lightbox-open');
  this.el.classList.remove('closed');
  this.el.classList.add('open');
};

/**
 * [close description]
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
Lightbox.prototype.close = function(ev) {
  body.classList.remove('lightbox-open');
  this.el.classList.remove('open');
  this.el.classList.add('closed');
  this.unbindEvents();
  this.modal.removeChild(this.frag);
};

module.exports = Lightbox;
