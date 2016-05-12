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
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ function(module, exports, __webpack_require__) {

	var Page = __webpack_require__(/*! ./modules/page.js */ 1);
	
	function init() {
	  console.log('init');
	}
	
	init();


/***/ },
/* 1 */
/*!*************************!*\
  !*** ./modules/page.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var Pagination = __webpack_require__(/*! ./pagination.js */ 2);
	var Lightbox = __webpack_require__(/*! ./lightbox.js */ 3);
	var Slideshow = __webpack_require__(/*! ./slideshow.js */ 4);
	
	function init() {
	  console.log('Page init');
	}
	
	init();
	
	exports = {
	  init: init
	};


/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./modules/pagination.js ***!
  \*******************************/
/***/ function(module, exports) {

	function init() {
	  console.log('Pagination init');
	}
	
	init();
	
	module.exports = {
	  init: init
	};


/***/ },
/* 3 */
/*!*****************************!*\
  !*** ./modules/lightbox.js ***!
  \*****************************/
/***/ function(module, exports) {

	function init() {
	  console.log('Lightbox init');
	}
	
	init();
	
	module.exports = {
	  init: init
	};


/***/ },
/* 4 */
/*!******************************!*\
  !*** ./modules/slideshow.js ***!
  \******************************/
/***/ function(module, exports) {

	function init() {
	  console.log('Slideshow init');
	}
	
	init();
	
	module.exports = {
	  init: init
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map