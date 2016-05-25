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
  this.initialize();
};

util.inherit(Lightbox, Component);

Lightbox.prototype.bindEvents = function() {
  var button = $('.lightbox-close', this.el)[0];
  button.addEventListener('click',
      this.closeLightboxRequested.bind(this));
  document.addEventListener('keyup', function(ev) {
    if (ev.which && ev.which === 27) {
      this.closeLightboxRequested.bind(this);
    }
  }.bind(this));

};

Lightbox.prototype.unbindEvents = function() {
  var button = $('.lightbox-close', this.el)[0];
  button.removeEventListener('click');
  document.removeEventListener('keyup');
};


Lightbox.prototype.closeLightboxRequested = function() {
  this.close();
};


Lightbox.prototype.open = function() {
  body.classList.add('lightbox-open');
  this.el.classList.remove('closed');
  this.el.classList.add('open');
};

Lightbox.prototype.close = function(ev) {
  body.classList.add('lightbox-closed');
  this.el.classList.remove('open');
  this.el.classList.add('closed');
  this.unbindEvents();
  this.modal.removeChild(this.frag);
};

module.exports = Lightbox;
