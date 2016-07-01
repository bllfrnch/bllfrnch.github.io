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
	    var page = new Page.getInstance();
	    document.org = {billf: {page: page}};
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
	
	var Utility = __webpack_require__(/*! ../../global/utility.js */ 2);
	var Component = __webpack_require__(/*! ../component/module.js */ 3);
	var ComponentRegistry = __webpack_require__(/*! ../../global/componentregistry.js */ 4);
	var ComponentFactory = __webpack_require__(/*! ../../global/componentfactory.js */ 15);
	var util = Utility.getInstance();
	var $ = util.$
	
	module.exports = (function() {
	  var componentRegistry = ComponentRegistry.getInstance(),
	    instance;
	
	  /**
	   * Page class. Creates a page component. Bootstraps and registers all
	   * components that are declared on the page and provides an API for
	   * components to register, retrieve, and remove them later. Extends Component,
	   * and this.el is set to document.
	   * @constructor
	   * @extends {Component}
	   * @param {Element} el The container element for the pagination.
	   * @param {[type]} params Parameters for the pagination class.
	   */
	  function Page(params) {
	    Component.call(this, document, params);
	    this.initialize();
	  }
	
	  util.inherit(Page, Component);
	
	  function initSingleton() {
	    return new Page();
	  }
	
	  /**
	   * [initialize description]
	   * @return {[type]} [description]
	   */
	  Page.prototype.initialize = function() {
	    this.els = $('[data-component]');
	    componentRegistry.add(this, null);
	    this.bootstrap();
	  };
	
	  /**
	   * [bootstrap description]
	   * TODO: Make this hierarchical
	   * @return {[type]} [description]
	   */
	  Page.prototype.bootstrap = function() {
	    var componentEls = [];
	    this.els.forEach(function(el) {
	      var children = $('[data-component]', el),
	          comp;
	      if (!children.length) {
	        comp = this.instantiateComponent(el);
	        componentRegistry.add(comp, this.id);
	      }
	    }, this);
	  };
	
	  /**
	   * [instantiateComponent description]
	   * @param  {[type]} el [description]
	   * @return {[type]}    [description]
	   */
	  Page.prototype.instantiateComponent = function(el) {
	    var type = el.getAttribute('data-component').toLowerCase(),
	        params = JSON.parse(el.getAttribute('data-params')),
	        componentFactory = ComponentFactory.getInstance(),
	        instance;
	
	    if (type) {
	      instance = componentFactory.createComponent(type, el, params);
	      componentRegistry.add(instance, this.id);
	    }
	
	    // throw error if no instance could be instantiated.
	    if (!instance) {
	      throw new Error('Instance not instantiated for element ', el);
	    }
	
	    return instance;
	  };
	
	  return {
	    /**
	     * Returns the page singleton.
	     * @return {Page} An instance of type Page, which inherits from Component,
	     * but provides other methods for bootstrapping and registering instances
	     * so they can communicate with each other.
	     */
	    getInstance: function() {
	      if (!instance) {
	        instance = initSingleton();
	      }
	      return instance;
	    }
	  };
	})();


/***/ },
/* 2 */
/*!******************************!*\
  !*** ./js/global/utility.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = (function() {
	  var instance;
	
	  /**
	   * Returns a new Utility object.
	   * @return {Utility}
	   */
	  function initSingleton() {
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
	   * General purpose query selector function. Performance boosting optimization
	   * code lifted from
	   * http://ryanmorr.com/abstract-away-the-performance-faults-of-queryselectorall/
	   * @param  {String} selector A string with one or more selectors separated by
	   * commas.
	   * @param  {[type]} context The context elements from which to begin searching
	   * for child elements. Defaults to the document element if nothing is passed.
	   * @return {Array<Element>} Returns an array of element nodes.
	   */
	  Utility.prototype.$ = function(selector, context) {
	    var u = Utility.prototype;
	    context = context || document;
	
	    if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
	      switch (selector.charAt(0)) {
	        case '#':
	            // Handle ID-based selectors
	            return [context.getElementById(selector.substr(1))];
	        case '.':
	          // Handle class-based selectors
	          // Query by multiple classes by converting the selector
	          // string into single spaced class names
	          var classes = selector.substr(1).replace(/\./g, ' ');
	          return u.toArray(context.getElementsByClassName(classes));
	        default:
	          // Handle tag-based selectors
	          return u.toArray(context.getElementsByTagName(selector));
	      }
	    }
	
	    // use the prototype so util.$ can be aliased.
	    // TODO: clean this up.
	
	    return u.toArray(context.querySelectorAll(selector));
	  };
	
	  /**
	   * Extend an object. This function can be called with any number of arguments.
	   * @param  {Object} obj Arbitrary number of object parameters.
	   * @return {Object} The object after extension, which is a new object, not a
	   * reference to any of the passed parameters.
	   * TODO: revisit this to make sure objects aren't being overwritten
	   * unwittingly.
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
	        instance = initSingleton();
	      }
	      return instance;
	    }
	  }
	})();


/***/ },
/* 3 */
/*!*******************************************!*\
  !*** ./js/components/component/module.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../global/utility.js */ 2);
	var ComponentRegistry = __webpack_require__(/*! ../../global/componentregistry.js */ 4);
	var util = Utility.getInstance();
	var radio = __webpack_require__(/*! radio */ 5);
	var shortid = __webpack_require__(/*! shortid */ 6);
	var $ = util.$;
	
	var COMPONENT_INITIALIZED_EVENT;
	
	function Component(el, params) {
	  this.id = shortid.generate();
	  this.radio = radio;
	  this.el = el;
	  this.params = params;
	  this.listeners = {};
	}
	
	/**
	 * Initializes the component.
	 */
	Component.prototype.initialize = function() {
	  this.setId(this.el, this.id);
	  this.bindEvents();
	  this.setInitialized();
	};
	
	/**
	 * If no id exists on the specified element, sets an id attribute
	 * and returns it, or if the id already exists, returns the existing id.
	 * @param {ELement} el The element on which to set the id attribute.
	 * @param {Number} id Optional id parameter. If not specified, the method
	 * generates an id, otherwise, it uses the passed value.
	 * @return {[type]} The id.
	 */
	Component.prototype.setId = function(el, id) {
	  id = id? id: shortid.generate();
	  el.setAttribute('id', id);
	  return id;
	};
	
	/**
	 * Returns the id of the element.
	 * @param  {Element} el The element whose id will be returned.
	 * @return {String} The id.
	 */
	Component.prototype.getId = function(el) {
	  var id;
	
	  if (!el) return false;
	  id = el === document? 'document' : el.getAttribute('id');
	  return id;
	};
	
	/**
	 * Given a component element id, return the element.
	 * @param  {String} id The id of the element.
	 * @return {Node} Return either the document or the HTML element.
	 */
	Component.prototype.getEl = function(id) {
	  return id === 'document' ? document: $('#' + id)[0];
	};
	
	/**
	 * An abstract method that is meant to be overridden by subclasses.
	 */
	Component.prototype.bindEvents = function() {};
	
	/**
	 * [register description]
	 * @param  {[type]} parentId [description]
	 * @return {[type]}          [description]
	 */
	Component.prototype.register = function(parentId) {
	  var componentRegistry = ComponentRegistry.getInstance(),
	    parentId = parentId || this.parentId;
	  componentRegistry.addComponent(this, parentId);
	};
	
	/**
	 * [sendUp description]
	 * @return {[type]} [description]
	 */
	Component.prototype.sendUp = function(data) {
	
	};
	
	/**
	 * [sendDown description]
	 * @return {[type]} [description]
	 */
	Component.prototype.sendDown = function(data) {
	
	};
	
	/**
	 * Sends a message to all components.
	 * @return {[type]} [description]
	 */
	Component.prototype.shout = function(data) {
	
	};
	
	/**
	 * Sends a message
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	Component.prototype.sendMessage = function(data) {
	
	};
	
	/**
	 * Adds an event listener to an element.
	 * @param {Node} el Element to which listener will be added.
	 * @param {String} ev Event type, e.g., 'click'.
	 * @param {Function} fn The function to bind to the event.
	 * @param {Boolean} capture Whether to use capture. Optional, and defaults to
	 * false.
	 */
	Component.prototype.addListener = function(el, ev, fn) {
	  var f = fn.bind(this),
	    capture = capture || false,
	    id = this.getId(el) || this.setId(el);
	
	  if (this.listeners[id] === undefined) {
	    this.listeners[id] = {};
	  }
	
	  if (this.listeners[id][ev] === undefined) {
	    this.listeners[id][ev] = [];
	  }
	
	  this.listeners[id][ev].push(f, capture);
	  el.addEventListener(ev, f, capture);
	};
	
	
	/**
	 * Removes all listeners for a given element of a specific type.
	 * @param  {Element} el The element from which events will be removed.
	 * @param  {String} ev The event type, e.g., 'click'.
	 */
	Component.prototype.removeListeners = function(el, ev) {
	  var id = this.getId(el);
	
	  if (!id) throw new Error('No id set for element ', el);
	
	  if (id in this.listeners && ev in this.listeners[id]) {
	    this.listeners[id][ev].forEach(function(listener) {
	      el.removeEventListener(ev, listener);
	    });
	  }
	};
	
	/**
	 * Unbinds all events for the component.
	 */
	Component.prototype.unbindEvents = function() {
	  var listeners, fn, el;
	  for (var id in this.listeners) {
	    listeners = this.listeners[id];
	    for (var ev in listeners) {
	      fn = listeners[ev][0];
	      el = this.getEl(id);
	      el.removeEventListener(ev, fn);
	    }
	  }
	};
	
	/**
	 * Finalize. WIP.
	 */
	Component.prototype.finalize = function() {
	  this.unbindEvents();
	};
	
	/**
	 * [setInitialized description]
	 */
	Component.prototype.setInitialized = function() {
	  var el = this.el,
	    id = this.id;
	  radio(COMPONENT_INITIALIZED_EVENT).broadcast({ el: el, id: id });
	};
	
	module.exports = Component;


/***/ },
/* 4 */
/*!****************************************!*\
  !*** ./js/global/componentregistry.js ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = (function() {
	  var instance;
	
	  function ComponentRegistry() {
	    this._registry = {};
	  }
	
	  function initSingleton() {
	    return new ComponentRegistry();
	  }
	
	  /**
	   * Adds a component to the registry. If parentId isn't specified, then the
	   * component is added to the top level. Only components of type Page can be
	   * added without a parentId.
	   * TODO: maintain a data structure for fast access to members aside from just
	   * the registry
	   * @param {[type]} component [description]
	   */
	  ComponentRegistry.prototype.add = function(component) {
	    var id = component.id;
	    this._registry[id] = component;
	  };
	
	  ComponentRegistry.prototype.update = function(component, oldId) {
	
	  };
	
	  /**
	   * [get description]
	   * @param  {[type]} id            [description]
	   * @param  {[type]} contextObject [description]
	   * @return {[type]}               [description]
	   */
	  ComponentRegistry.prototype.get = function(id) {
	    return this._registry[id];
	  };
	
	  ComponentRegistry.prototype.remove = function(id) {
	
	  };
	
	  return {
	    getInstance: function() {
	      if (!instance) {
	        instance = initSingleton()
	      }
	      return instance;
	    }
	  };
	})();


/***/ },
/* 5 */
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
/* 6 */
/*!****************************!*\
  !*** ./~/shortid/index.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(/*! ./lib/index */ 7);


/***/ },
/* 7 */
/*!********************************!*\
  !*** ./~/shortid/lib/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(/*! ./alphabet */ 8);
	var encode = __webpack_require__(/*! ./encode */ 10);
	var decode = __webpack_require__(/*! ./decode */ 12);
	var isValid = __webpack_require__(/*! ./is-valid */ 13);
	
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
	var clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ 14) || 0;
	
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
/* 8 */
/*!***********************************!*\
  !*** ./~/shortid/lib/alphabet.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ 9);
	
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
/* 9 */
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
/* 10 */
/*!*********************************!*\
  !*** ./~/shortid/lib/encode.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(/*! ./random/random-byte */ 11);
	
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
/* 11 */
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
/* 12 */
/*!*********************************!*\
  !*** ./~/shortid/lib/decode.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(/*! ./alphabet */ 8);
	
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
/* 13 */
/*!***********************************!*\
  !*** ./~/shortid/lib/is-valid.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(/*! ./alphabet */ 8);
	
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
/* 14 */
/*!*********************************************************!*\
  !*** ./~/shortid/lib/util/cluster-worker-id-browser.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 15 */
/*!***************************************!*\
  !*** ./js/global/componentfactory.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Pagination = __webpack_require__(/*! ../components/pagination/module.js */ 16);
	var Lightbox = __webpack_require__(/*! ../components/lightbox/module.js */ 18);
	var MultiPic = __webpack_require__(/*! ../components/multipic/module.js */ 20);
	var StickyHeader = __webpack_require__(/*! ../components/stickyheader/module.js */ 21);
	
	module.exports = (function() {
	  var instance,
	    components = {
	      pagination: Pagination,
	      lightbox: Lightbox,
	      multipic: MultiPic,
	      stickyheader: StickyHeader
	    };
	
	  /**
	   * Returns a new Utility object.
	   * @return {Utility}
	   */
	  function initSingleton() {
	    return new ComponentFactory();
	  }
	
	  /**
	   * Component class.
	   * @constructor
	   */
	  function ComponentFactory() {};
	
	  /**
	   * [createComponent description]
	   * @param  {[type]} type [description]
	   * @return {[type]}      [description]
	   */
	  ComponentFactory.prototype.createComponent = function(type, el, params) {
	    return new components[type](el, params);
	  };
	
	  return {
	    /**
	     * Return a singleton instance of the Utility class.
	     * @return {Utility} Utility object.
	     */
	    getInstance: function() {
	      if (!instance) {
	        instance = initSingleton();
	      }
	      return instance;
	    }
	  }
	})();


/***/ },
/* 16 */
/*!********************************************!*\
  !*** ./js/components/pagination/module.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../global/utility.js */ 2);
	var Component = __webpack_require__(/*! ../component/module.js */ 3);
	var render = __webpack_require__(/*! ./template.dot */ 17);
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
	  this.targetId = params.id;
	  this.pageData = params.pageData;
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
	    id = this.targetId;
	
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
/* 17 */
/*!***********************************************!*\
  !*** ./js/components/pagination/template.dot ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = function anonymous(it
	/**/) {
	var out='';var arr1=it.imgs;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='<li> <a href="#/'+(index)+'" title="" class="page-link"><span>LiveCase home page</span></a></li>';} } return out;
	}

/***/ },
/* 18 */
/*!******************************************!*\
  !*** ./js/components/lightbox/module.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../global/utility.js */ 2);
	var Component = __webpack_require__(/*! ../component/module.js */ 3);
	var Pagination = __webpack_require__(/*! ../pagination/module.js */ 16);
	var render = __webpack_require__(/*! ./template.dot */ 19);
	var util = Utility.getInstance();
	var $ = util.$;
	
	var body, frag;
	
	function Lightbox(el, params) {
	  Component.call(this, el, params);
	  body = $('body')[0];
	  this.modal = $('.lightbox-modal', this.el)[0];
	  this.mask = $('.lightbox-mask', this.el)[0];
	  this.content = this.createDom();
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
	  var container = $('.lightbox-body', this.modal)[0];
	  container.innerHTML = html;
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
	};
	
	module.exports = Lightbox;


/***/ },
/* 19 */
/*!*********************************************!*\
  !*** ./js/components/lightbox/template.dot ***!
  \*********************************************/
/***/ function(module, exports) {

	module.exports = function anonymous(it
	/**/) {
	var out='<div class="lightbox closed"> <div class="lightbox-mask"></div> <div class="lightbox-modal"> <header class="lightbox-header"> <a href="#" class="lightbox-close"><i class="fa fa-times" aria-hidden="true"></i></a> </header> <div class="lightbox-body"> <div class="media-wrapper"> <figure class="media media-image"> <picture> <img src="'+(it.image.src)+'" alt="'+(it.image.alt)+'"> </picture> </figure> </div> </div> </div></div>';return out;
	}

/***/ },
/* 20 */
/*!******************************************!*\
  !*** ./js/components/multipic/module.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../global/utility.js */ 2);
	var Component = __webpack_require__(/*! ../component/module.js */ 3);
	var Pagination = __webpack_require__(/*! ../pagination/module.js */ 16);
	var Lightbox = __webpack_require__(/*! ../lightbox/module.js */ 18);
	// var render = require('./template.dot');
	var util = Utility.getInstance();
	var $ = util.$;
	
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
	
	  this.current = this.params.imgs[0];
	
	  paginationEl = $('.pagination ul', this.el)[0];
	  pagination = new Pagination(paginationEl, {
	    id: this.id,
	    imgs: this.params.imgs.map(function(img){ return img.src; })
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
	 * Returns the current image node.
	 * @return {Element} The image element currently on display.
	 */
	MultiPic.prototype.getCurrentImg = function() {
	  return $('img[src="' + this.current.src + '"]', this.el)[0];
	};
	
	/**
	 * [unbindImgEvent description]
	 * @return {[type]} [description]
	 */
	MultiPic.prototype.unbindImgEvent = function() {
	  this.removeListeners(this.getCurrentImg().parentNode, 'click');
	};
	
	/**
	 *
	 */
	MultiPic.prototype.bindImgEvent = function() {
	  this.addListener(this.getCurrentImg().parentNode, 'click',
	      this.lightboxRequested);
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
	  this.getCurrentImg().parentNode.style.display = 'none';
	  this.unbindImgEvent();
	  this.current = this.params.imgs[idx];
	  this.getCurrentImg().parentNode.style.display = 'block';
	  this.bindImgEvent();
	}
	
	module.exports = MultiPic;


/***/ },
/* 21 */
/*!**********************************************!*\
  !*** ./js/components/stickyheader/module.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utility = __webpack_require__(/*! ../../global/utility.js */ 2);
	var Component = __webpack_require__(/*! ../component/module.js */ 3);
	var util = Utility.getInstance();
	var $ = util.$;
	
	/**
	 * StickyHeader class. Creates a sticky header/navigation module for use at top
	 * of all pages.
	 * @constructor
	 * @extends {Component}
	 * @param {Element} el     The container element for the pagination.
	 * @param {[type]} params Parameters for the sticky header class.
	 */
	function StickyHeader(el, params) {
	  Component.call(this, el, params);
	  this.initialize();
	}
	
	util.inherit(StickyHeader, Component);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map