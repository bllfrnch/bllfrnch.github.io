'use strict';

var Utility = require('../../utility.js');
var util = Utility.getInstance();
var $ = util.$;

function Lightbox(el, params) {
  this.el = el;
  this.clone = el.clone;
  this.body = $('body')[0];
  this.params = params;
  this.modal = $('.lightbox-modal', this.el)[0];
  this.modal.appendChild(params.clone);
  this.open();
  this.bindEvents();
};

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
  [button, document].forEach(function(el) {
    el.removeEventListener('click', this.closeLightboxRequested);
  }, this);
};


Lightbox.prototype.closeLightboxRequested = function() {
  this.close();
};


Lightbox.prototype.open = function() {
  this.el.classList.remove('closed');
  this.el.classList.add('open');
  this.body.classList.add('lightbox-open');
};

Lightbox.prototype.close = function(ev) {
  this.el.classList.remove('open');
  this.el.classList.add('closed');
  this.body.classList.add('lightbox-closed');
  this.el = this.clone;
};

module.exports = Lightbox;
