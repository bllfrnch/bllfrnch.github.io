'use strict';

var Utility = require('../../global/utility.js');
var Component = require('../component/module.js');
var Pagination = require('../pagination/module.js');
var render = require('./template.dot');
var util = Utility.getInstance();
var $ = util.$;

function Lightbox(el, params) {
  Component.call(this, el, params);
  this.createDom();
  this.wrapper = $('.lightbox', this.el)[0];
  this.modal = $('.lightbox-modal', this.el)[0];
  this.mask = $('.lightbox-mask', this.el)[0];
  this.open();
  this.closeButton = $('.lightbox-close', this.el)[0];
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
};

/**
 * [scrub description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Lightbox.prototype.createDom = function() {
  var html = render(this.params);
  this.el.innerHTML = html;
  return $('.lightbox', this.el);
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
  var body = $('body')[0];
  body.classList.add('prevent-scroll');
  this.wrapper.classList.remove('hidden');
};

/**
 * [close description]
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
Lightbox.prototype.close = function(ev) {
  this.unbindEvents();
  this.el.removeChild(this.wrapper);
};

module.exports = Lightbox;
