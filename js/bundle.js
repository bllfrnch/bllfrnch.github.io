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
	    els = $('[data-component]'),
	    instances = [];
	
	  els.forEach(function(el) {
	    var key = el.getAttribute('data-component').toLowerCase(),
	      params = JSON.parse(el.getAttribute('data-params').replace(/'/, '"')),
	      constructor = components[key],
	      instance;
	
	    if (constructor) {
	      instances.push(new constructor(el, params));
	    }
	  });
	
	  return {
	    els: els,
	    instances: instances
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
	var Component = __webpack_require__(/*! ../component/module.js */ 34);
	var render = __webpack_require__(/*! ./template.dot */ 8);
	var util = Utility.getInstance();
	var $ = util.$;
	
	var SELECTED_CLASS = 'selected';
	var CLICK_EVENT = 'pagination:pageLinkClicked';
	
	
	/**
	 * Pagination class. Creates a pagination component. Publishes events when page
	 * link elements are clicked and updates classes.
	 * @constructor
	 * @extends {Component}
	 * @param {Element} el     The container element for the pagination.
	 * @param {[type]} params Parameters for the pagination class.
	 */
	function Pagination(el, params) {
	  Component.call(this, el, params);
	
	  this.multiPicId = params.id;
	  this.pageLinks = this.createDom();
	  this.current = this.toggleSelected(this.pageLinks[0]);
	  this.initialize();
	}
	
	util.inherit(Pagination, Component);
	
	Pagination.prototype.bindEvents = function() {
	  this.pageLinks.forEach(function(link) {
	    this.addListener(link, 'click', this.clickHandler);
	    //link.addEventListener('click', this.clickHandler.bind(this));
	  }, this);
	};
	
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
	Pagination.prototype.clickHandler = function(ev) {
	  var el = ev.target,
	    page = this.getRequestedPage(el),
	    id = this.multiPicId;
	
	  ev.preventDefault();
	
	  if (el.classList.contains(SELECTED_CLASS)) {
	    return;
	  }
	
	  [this.current, el].forEach(function(el) {
	    this.toggleSelected(el);
	  }, this);
	
	  this.current = el;
	
	  this.radio(CLICK_EVENT).broadcast({ el: el, page: page, id: id});
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
	
	
	  /**
	   * [inherit description]
	   * @param  {[type]} Child  [description]
	   * @param  {[type]} Parent [description]
	   * @return {[type]}        [description]
	   */
	  Utility.prototype.inherit = function(Child, Parent) {
	    var F = function() {};
	    F.prototype = Parent.prototype;
	    Child.prototype = new F();
	    Child.prototype.constructor = Child;
	    Child.super = Parent.prototype;
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../utility.js */ 3);
	var Component = __webpack_require__(/*! ../component/module.js */ 34);
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


/***/ },
/* 6 */
/*!******************************************!*\
  !*** ./js/components/multipic/module.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../utility.js */ 3);
	var Component = __webpack_require__(/*! ../component/module.js */ 34);
	var Pagination = __webpack_require__(/*! ../pagination/module.js */ 2);
	var Lightbox = __webpack_require__(/*! ../lightbox/module.js */ 5);
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
	
	
	/**
	 * [unbindImgEvent description]
	 * @return {[type]} [description]
	 */
	MultiPic.prototype.unbindImgEvent = function() {
	  this.removeListeners(this.current.parentNode, 'click');
	};
	
	/**
	 *
	 */
	MultiPic.prototype.bindImgEvent = function() {
	  this.addListener(this.current.parentNode, 'click', this.lightboxRequested);
	  // this.current.parentNode.addEventListener('click',
	  //     this.lightboxRequested.bind(this));
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
	  this.lightbox.finalize();
	};
	
	
	/**
	 * [changePic description]
	 * @return {[type]} [description]
	 */
	MultiPic.prototype.changePic = function(idx) {
	  this.current.parentNode.style.display = 'none';
	  this.unbindImgEvent();
	  this.current = this.pics[idx];
	  this.current.parentNode.style.display = 'block';
	  this.bindImgEvent();
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

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/*!*******************************************!*\
  !*** ./js/components/component/module.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var Utility = __webpack_require__(/*! ../../utility.js */ 3);
	var util = Utility.getInstance();
	var radio = __webpack_require__(/*! radio */ 4);
	var shortid = __webpack_require__(/*! shortid */ 35);
	
	var COMPONENT_INITIALIZED_EVENT;
	
	function Component(el, params) {
	  this.id = shortid.generate();
	  this.radio = radio;
	  this.el = el;
	  this.params = params;
	  this.listeners = {};
	}
	
	/**
	 * [initialize description]
	 * @return {[type]} [description]
	 */
	Component.prototype.initialize = function() {
	  this.bindEvents();
	  this.setInitialized();
	};
	
	/**
	 * An abstract method that is meant to be overridden but subclasses.
	 * @return {[type]} [description]
	 */
	Component.prototype.bindEvents = function() {};
	
	/**
	 * [addListener description]
	 * @param {[type]}   el      [description]
	 * @param {[type]}   ev      [description]
	 * @param {Function} fn      [description]
	 * @param {[type]}   capture [description]
	 */
	Component.prototype.addListener = function(el, ev, fn, capture) {
	  var f = fn.bind(this);
	  capture = capture || false;
	
	  if (this.listeners[el] === undefined) {
	    this.listeners[el] = {};
	  }
	
	  if (this.listeners[el][ev] === undefined) {
	    this.listeners[el][ev] = [];
	  }
	
	  this.listeners[el][ev].push(f, capture);
	  el.addEventListener(ev, f, capture);
	};
	
	/**
	 * [removeListeners description]
	 * @param  {[type]} el [description]
	 * @param  {[type]} ev [description]
	 * @return {[type]}    [description]
	 */
	Component.prototype.removeListeners = function(el, ev) {
	  if (el in this.listeners && ev in this.listeners[el]) {
	    this.listeners[el][ev].forEach(function(listener) {
	      el.removeEventListener(ev, listener);
	    });
	  }
	};
	
	/**
	 * [unbindEvents description]
	 * @return {[type]} [description]
	 */
	Component.prototype.unbindEvents = function() {
	  var listeners, fn;
	  for (var el in this.listeners) {
	    listeners = this.listeners[el];
	    for (var ev in listeners) {
	      fn = listeners[ev];
	      el.removeEventListener(ev, fn);
	    }
	  }
	};
	
	Component.prototype.finalize = function() {
	  this.unbindEvents();
	};
	
	/**
	 * [setInitialized description]
	 */
	Component.prototype.setInitialized = function() {
	  radio(COMPONENT_INITIALIZED_EVENT).broadcast({
	
	  });
	};
	
	module.exports = Component;


/***/ },
/* 35 */
/*!****************************!*\
  !*** ./~/shortid/index.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(/*! ./lib/index */ 36);


/***/ },
/* 36 */
/*!********************************!*\
  !*** ./~/shortid/lib/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(/*! ./alphabet */ 37);
	var encode = __webpack_require__(/*! ./encode */ 39);
	var decode = __webpack_require__(/*! ./decode */ 41);
	var isValid = __webpack_require__(/*! ./is-valid */ 42);
	
	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;
	
	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;
	
	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ 43) || 0;
	
	// Counter is used when shortid is called multiple times in one second.
	var counter;
	
	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;
	
	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {
	
	    var str = '';
	
	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
	
	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }
	
	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);
	
	    return str;
	}
	
	
	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}
	
	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}
	
	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }
	
	    return alphabet.shuffled();
	}
	
	
	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 37 */
/*!***********************************!*\
  !*** ./~/shortid/lib/alphabet.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ 38);
	
	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;
	
	var shuffled;
	
	function reset() {
	    shuffled = false;
	}
	
	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }
	
	    if (_alphabet_ === alphabet) {
	        return;
	    }
	
	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }
	
	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });
	
	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }
	
	    alphabet = _alphabet_;
	    reset();
	}
	
	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}
	
	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}
	
	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }
	
	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;
	
	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}
	
	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}
	
	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}
	
	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 38 */
/*!**************************************************!*\
  !*** ./~/shortid/lib/random/random-from-seed.js ***!
  \**************************************************/
/***/ function(module, exports) {

	'use strict';
	
	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
	
	var seed = 1;
	
	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}
	
	function setSeed(_seed_) {
	    seed = _seed_;
	}
	
	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 39 */
/*!*********************************!*\
  !*** ./~/shortid/lib/encode.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(/*! ./random/random-byte */ 40);
	
	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;
	
	    var str = '';
	
	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}
	
	module.exports = encode;


/***/ },
/* 40 */
/*!*****************************************************!*\
  !*** ./~/shortid/lib/random/random-byte-browser.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto
	
	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}
	
	module.exports = randomByte;


/***/ },
/* 41 */
/*!*********************************!*\
  !*** ./~/shortid/lib/decode.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(/*! ./alphabet */ 37);
	
	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}
	
	module.exports = decode;


/***/ },
/* 42 */
/*!***********************************!*\
  !*** ./~/shortid/lib/is-valid.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(/*! ./alphabet */ 37);
	
	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }
	
	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}
	
	module.exports = isShortId;


/***/ },
/* 43 */
/*!*********************************************************!*\
  !*** ./~/shortid/lib/util/cluster-worker-id-browser.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map