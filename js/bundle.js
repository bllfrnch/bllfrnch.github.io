/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Page = __webpack_require__(/*! ./modules/page.js */ 1);
	
	function init() {
	  var page = new Page();
	
	  console.log(page);
	}
	
	init();


/***/ },
/* 1 */
/*!****************************!*\
  !*** ./js/modules/page.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Pagination = __webpack_require__(/*! ./pagination.js */ 2);
	var Lightbox = __webpack_require__(/*! ./lightbox.js */ 4);
	var Slideshow = __webpack_require__(/*! ./slideshow.js */ 5);
	var Utility = __webpack_require__(/*! ./utility.js */ 3);
	
	var modules = {
	  pagination: Pagination,
	  lightbox: Lightbox,
	  slideshow: Slideshow
	};
	
	var util = Utility.getInstance();
	var $ = util.$$();
	
	function Page() {
	  var els = $('[data-module]');
	
	  els.forEach(function(el) {
	    var key = el.getAttribute('data-module').toLowerCase(),
	        params = JSON.parse(el.getAttribute('data-params').replace(/'/, '"')),
	        constructor = modules[key],
	        instance;
	
	    if (constructor) {
	      instance = new constructor(el, params);
	    }
	  });
	
	  return {
	    els: els
	  };
	}
	
	module.exports = Page;


/***/ },
/* 2 */
/*!**********************************!*\
  !*** ./js/modules/pagination.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ./utility.js */ 3);
	var radio = __webpack_require__(/*! radio */ 6);
	var util = Utility.getInstance();
	var $ = util.$$();
	
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
	
	  radio(CLICK_EVENT).broadcast({
	    el: el,
	    page: page
	  });
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


/***/ },
/* 3 */
/*!*******************************!*\
  !*** ./js/modules/utility.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = (function() {
	  var instance;
	
	  /**
	   * [init description]
	   * @return {[type]} [description]
	   */
	  function init() {
	    return new Utility();
	  }
	
	  /**
	   * [Utility description]
	   */
	  function Utility() {};
	
	  /**
	   * [toArray description]
	   * @param  {[type]} nodeSet [description]
	   * @return {[type]}         [description]
	   */
	  Utility.prototype.toArray = function(nodeSet) {
	    return Array.prototype.slice.call(nodeSet, 0);
	  };
	
	  /**
	   * [$ description]
	   * @param  {[type]} selector [description]
	   * @param  {[type]} context  [description]
	   * @return {[type]}          [description]
	   */
	  Utility.prototype.$ = function(selector, context) {
	    if (!context) {
	      context = document;
	    }
	    return this.toArray(context.querySelectorAll(selector));
	  };
	
	  Utility.prototype.$$ = function() {
	    return this.$.bind(this);
	  };
	
	  return {
	    /**
	     * [getInstance description]
	     * @return {[type]} [description]
	     */
	    getInstance: function() {
	      if (!instance) {
	        instance = init();
	      }
	      return instance;
	    }
	  }
	})();


/***/ },
/* 4 */
/*!********************************!*\
  !*** ./js/modules/lightbox.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	function init() {
	  console.log('Lightbox init');
	}
	
	module.exports = {
	
	};


/***/ },
/* 5 */
/*!*********************************!*\
  !*** ./js/modules/slideshow.js ***!
  \*********************************/
/***/ function(module, exports) {

	'use strict';
	
	function init() {
	  console.log('Slideshow init');
	}
	
	module.exports = {
	  init: init
	};


/***/ },
/* 6 */
/*!**************************!*\
  !*** ./~/radio/radio.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 Radio.js - Chainable, Dependency Free Publish/Subscribe for Javascript
	 http://radio.uxder.com
	 Author: Scott Murphy 2011
	 twitter: @hellocreation, github: uxder
	 
	 Permission is hereby granted, free of charge, to any person
	 obtaining a copy of this software and associated documentation
	 files (the "Software"), to deal in the Software without
	 restriction, including without limitation the rights to use,
	 copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the
	 Software is furnished to do so, subject to the following
	 conditions:
	 
	 The above copyright notice and this permission notice shall be
	 included in all copies or substantial portions of the Software.
	 
	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 OTHER DEALINGS IN THE SOFTWARE.
	 */
	(function (name, global, definition) {
		if (true) module.exports = definition(name, global);
		else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
		else global[name] = definition(name, global);
	})('radio', this, function (name, global) {
	
		"use strict";
	
		/**
		 * Main Wrapper for radio.$ and create a function radio to accept the channelName
		 * @param {String} channelName topic of event
		 */
		function radio(channelName) {
			radio.$.channel(channelName);
			return radio.$;
		}
	
		radio.$ = {
			version: '0.2',
			channelName: "",
			channels: [],
			/**
			 * Broadcast (publish)
			 * Iterate through all listeners (callbacks) in current channel and pass arguments to subscribers
			 * @param arguments data to be sent to listeners
			 * @example
			 *    //basic usage
			 *    radio('channel1').broadcast('my message'); 
			 *    //send an unlimited number of parameters
			 *    radio('channel2').broadcast(param1, param2, param3 ... );
			 */
			broadcast: function() {
				var i, c = this.channels[this.channelName],
					l = c.length,
					subscriber, callback, context;
				//iterate through current channel and run each subscriber
				for (i = 0; i < l; i++) {
					subscriber = c[i];
					//if subscriber was an array, set the callback and context.
					if ((typeof(subscriber) === 'object') && (subscriber.length)) {
						callback = subscriber[0];
						//if user set the context, set it to the context otherwise, it is a globally scoped function
						context = subscriber[1] || global;
					}
					callback.apply(context, arguments);
				}
				return this;
			},
	
			/**
			 * Create the channel if it doesn't exist and set the current channel/event name
			 * @param {String} name the name of the channel
			 * @example
			 *    radio('channel1');
			 */
			channel: function(name) {
				var c = this.channels;
				//create a new channel if it doesn't exists
				if (!c[name]) c[name] = [];
				this.channelName = name;
				return this;
			},
	
			/**
			 * Add Subscriber to channel
			 * Take the arguments and add it to the this.channels array.
			 * @param {Function|Array} arguments list of callbacks or arrays[callback, context] separated by commas
			 * @example
			 *      //basic usage
			 *      var callback = function() {};
			 *      radio('channel1').subscribe(callback); 
			 *
			 *      //subscribe an endless amount of callbacks
			 *      radio('channel1').subscribe(callback, callback2, callback3 ...);
			 *
			 *      //adding callbacks with context
			 *      radio('channel1').subscribe([callback, context],[callback1, context], callback3);
			 *     
			 *      //subscribe by chaining
			 *      radio('channel1').subscribe(callback).radio('channel2').subscribe(callback).subscribe(callback2);
			 */
			subscribe: function() {
				var a = arguments,
					c = this.channels[this.channelName],
					i, l = a.length,
					p, ai = [];
	
				//run through each arguments and subscribe it to the channel
				for (i = 0; i < l; i++) {
					ai = a[i];
					//if the user sent just a function, wrap the fucntion in an array [function]
					p = (typeof(ai) === "function") ? [ai] : ai;
					if ((typeof(p) === 'object') && (p.length)) c.push(p);
				}
				return this;
			},
	
			/**
			 * Remove subscriber from channel
			 * Take arguments with functions and unsubscribe it if there is a match against existing subscribers.
			 * @param {Function} arguments callbacks separated by commas
			 * @example
			 *      //basic usage
			 *      radio('channel1').unsubscribe(callback); 
			 *      //you can unsubscribe as many callbacks as you want
			 *      radio('channel1').unsubscribe(callback, callback2, callback3 ...);
			 *       //removing callbacks with context is the same
			 *      radio('channel1').subscribe([callback, context]).unsubscribe(callback);
			 */
			unsubscribe: function() {
				var a = arguments,
					i, j, c = this.channels[this.channelName],
					l = a.length,
					cl = c.length,
					offset = 0,
					jo;
				//loop through each argument
				for (i = 0; i < l; i++) {
					//need to reset vars that change as the channel array items are removed
					offset = 0;
					cl = c.length;
					//loop through the channel
					for (j = 0; j < cl; j++) {
						jo = j - offset;
						//if there is a match with the argument and the channel function, unsubscribe it from the channel array
						if (c[jo][0] === a[i]) {
							//unsubscribe matched item from the channel array
							c.splice(jo, 1);
							offset++;
						}
					}
				}
				return this;
			}
		};
	
		return radio;
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map