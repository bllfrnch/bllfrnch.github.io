'use strict';

var Utility = require('../../utility.js');
var Component = require('../component/module.js');
var util = Utility.getInstance();
var $ = util.$;

var body, frag;

function Lightbox(el, params) {
  Component.call(this, el, params);
  body = $('body')[0];
  this.modal = $('.lightbox-modal', this.el)[0];
  this.frag = this.modal.appendChild(params.frag);
  this.open();
  this.closeButton = $('.lightbox-close', this.el)[0];
  this.initialize();
};

util.inherit(Lightbox, Component);

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
 * [unbindEvents description]
 * @return {[type]} [description]
 */
// Lightbox.prototype.unbindEvents = function() {
//   var button = $('.lightbox-close', this.el)[0];
//   button.removeEventListener('click');
//   document.removeEventListener('keyup');
// };

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
