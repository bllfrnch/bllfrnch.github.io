'use strict';

var Utility = require('../../utility.js');
var util = Utility.getInstance();
var $ = util.$;

function Lightbox(el, params) {
  this.el = el;
  this.params = params;
  this.modal = $('.lightbox-modal', this.el)[0];
  this.modal.appendChild(params.clone);
  this.open();
  this.bindEvents();
};

Lightbox.prototype.bindEvents = function() {
  //$('close-button', this.el);
};

Lightbox.prototype.open = function() {
  this.el.classList.remove('closed');
  this.el.classList.add('open');
};

Lightbox.prototype.close = function() {
  this.el.classList.remove('open');
  this.el.classList.add('closed');
};

module.exports = Lightbox;
