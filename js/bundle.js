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
	
	var Page = __webpack_require__(/*! ./components/page/module.js */ 1);
	
	function init() {
	  document.addEventListener('DOMContentLoaded', function(ev) {
	    var page = new Page();
	  });
	}
	
	init();


/***/ },
/* 1 */
/*!**************************************!*\
  !*** ./js/components/page/module.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Pagination = __webpack_require__(/*! ../pagination/module.js */ 2);
	var Lightbox = __webpack_require__(/*! ../lightbox/module.js */ 5);
	var MultiPic = __webpack_require__(/*! ../multipic/module.js */ 6);
	var Utility = __webpack_require__(/*! ../../utility.js */ 3);
	
	function Page() {
	  var components = {
	      pagination: Pagination,
	      lightbox: Lightbox,
	      multipic: MultiPic
	    },
	    util = Utility.getInstance(),
	    $ = util.$,
	    els = $('[data-component]');
	
	  els.forEach(function(el) {
	    var key = el.getAttribute('data-component').toLowerCase(),
	        params = JSON.parse(el.getAttribute('data-params').replace(/'/, '"')),
	        constructor = components[key],
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
/*!********************************************!*\
  !*** ./js/components/pagination/module.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../utility.js */ 3);
	var render = __webpack_require__(/*! ./template.dot */ 8);
	var radio = __webpack_require__(/*! radio */ 4);
	var util = Utility.getInstance();
	var $ = util.$;
	
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
	  this.pageLinks = this.createDom();
	  this.current = this.toggleSelected(this.pageLinks[0]);
	  this.pageLinks.forEach(function(link) {
	    link.addEventListener('click', this.clickHandler.bind(this));
	  }, this);
	}
	
	/**
	 * [createDom description]
	 * @return {[type]} [description]
	 */
	Pagination.prototype.createDom = function() {
	  var html = render(this.params);
	  this.el.innerHTML = html;
	  return $('.page-link', this.el);
	};
	
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
	
	  radio(CLICK_EVENT).broadcast({ el: el, page: page });
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
/*!***********************!*\
  !*** ./js/utility.js ***!
  \***********************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = (function() {
	  var instance;
	
	  /**
	   * Returns a new Utility object.
	   * @return {Utility}
	   */
	  function init() {
	    return new Utility();
	  }
	
	  /**
	   * Utility class.
	   * @constructor
	   */
	  function Utility() {};
	
	  /**
	   * Takes an array-like thing, e.g., a node list, and returns it as a proper
	   * array.
	   * @param  {Array-like} list The array-like list.
	   * @return {Array} The resulting array.
	   */
	  Utility.prototype.toArray = function(list) {
	    return Array.prototype.slice.call(list, 0);
	  };
	
	  /**
	   * General purpose query selector function.
	   * @param  {String} selector A string with one or more selectors separated by
	   * commas.
	   * @param  {[type]} context The context elements from which to begin searching
	   * for child elements. Defaults to the document element if nothing is passed.
	   * @return {Array<Element>} Returns an array of element nodes.
	   */
	  Utility.prototype.$ = function(selector, context) {
	    var u = Utility.prototype;
	    if (!context) {
	      context = document;
	    }
	    // use the prototype so util.$ can be aliased.
	    // TODO: clean this up.
	    return u.toArray(context.querySelectorAll(selector));
	  };
	
	  /**
	   * Extend an object.
	   * @param  {Object} )    {               var obj [description]
	   * @param  {[type]} args [description]
	   * @return {[type]}      [description]
	   */
	  Utility.prototype.extend = function() {
	    var obj = {},
	      args = this.toArray(arguments).reverse();
	
	    if (args.length == 1) {
	      return args[0];
	    } else if (args.length > 1) {
	      return args.forEach(function(arg) {
	        for (var key in arg) {
	          obj[key] = arg[key];
	        }
	      });
	    }
	  };
	
	  // Module is implemented as a singleton with no public access to the Utility
	  // class istself, only a pre-existing instance.
	  return {
	    /**
	     * Return a singleton instance of the Utility class.
	     * @return {Utility} Utility object.
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


/***/ },
/* 5 */
/*!******************************************!*\
  !*** ./js/components/lightbox/module.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
	function init() {
	  console.log('Lightbox init');
	}
	
	module.exports = {
	
	};


/***/ },
/* 6 */
/*!******************************************!*\
  !*** ./js/components/multipic/module.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var radio = __webpack_require__(/*! radio */ 4);
	var Pagination = __webpack_require__(/*! ../pagination/module.js */ 2);
	var Utility = __webpack_require__(/*! ../../utility.js */ 3);
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
	
	  this.el = el;
	  this.params = params;
	  this.pics = $('picture img', this.el);
	  this.current = this.pics[0];
	
	  paginationEl = $('.pagination ul', this.el)[0];
	  pagination = new Pagination(paginationEl, {
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
	  var picIndex = arguments[0].page;
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


/***/ },
/* 7 */,
/* 8 */
/*!***********************************************!*\
  !*** ./js/components/pagination/template.dot ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = function anonymous(it
	/**/) {
	var out='';var arr1=it.imgs;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='<li> <a href="#/'+(index)+'" title="" class="page-link"><span>LiveCase home page</span></a></li>';} } return out;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map