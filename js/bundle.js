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

	var Page = __webpack_require__(/*! ./modules/page.js */ 1);
	
	function init() {
	  var page = new Page();
	}
	
	init();


/***/ },
/* 1 */
/*!****************************!*\
  !*** ./js/modules/page.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var Pagination = __webpack_require__(/*! ./pagination.js */ 2);
	var Lightbox = __webpack_require__(/*! ./lightbox.js */ 3);
	var Slideshow = __webpack_require__(/*! ./slideshow.js */ 4);
	var Utility = __webpack_require__(/*! ./utility.js */ 5);
	
	var util = Utility.getInstance();
	var $ = util.$$();
	
	function Page() {
	  var els = $('[data-module]');
	
	  els.forEach(function(el) {
	    var moduleName = el.getAttribute('data-module');
	
	
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
/***/ function(module, exports) {

	function init() {
	  console.log('Pagination init');
	}
	
	module.exports = {
	  init: init
	};


/***/ },
/* 3 */
/*!********************************!*\
  !*** ./js/modules/lightbox.js ***!
  \********************************/
/***/ function(module, exports) {

	function init() {
	  console.log('Lightbox init');
	}
	
	module.exports = {
	
	};


/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./js/modules/slideshow.js ***!
  \*********************************/
/***/ function(module, exports) {

	function init() {
	  console.log('Slideshow init');
	}
	
	module.exports = {
	  init: init
	};


/***/ },
/* 5 */
/*!*******************************!*\
  !*** ./js/modules/utility.js ***!
  \*******************************/
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map