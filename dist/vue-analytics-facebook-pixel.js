(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var config = {
	  debug: false,
	  excludes: []
	};

	var _fbqEnabled = function _fbqEnabled() {
	  if (typeof window.fbq === 'undefined') {
	    if (config.debug) {
	      console.log('[Vue Facebook Pixel]: `window.fbq` is not defined, skipping');
	    }

	    return false;
	  }

	  return true;
	};

	var init = function init(appId) {
	  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (!_fbqEnabled()) return;

	  window.fbqPixelId = appId;

	  if (config.debug) {
	    console.log('[Vue Facebook Pixel] Initializing app ' + appId);
	  }

	  query('init', appId, data);
	};

	var event = function event(name) {
	  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (!_fbqEnabled()) return;

	  if (config.debug) {
	    console.groupCollapsed('[Vue Facebook Pixel] Track event \'' + name + '\'');
	    console.log('With data: ' + data);
	    console.groupEnd();
	  }

	  if (window.fbqPixelId) {
	    query('trackSingle', window.fbqPixelId, name, data);
	  }
	};

	var query = function query() {
	  var _window;

	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (!_fbqEnabled()) return;

	  if (config.debug) {
	    var _console;

	    console.groupCollapsed('[Vue Facebook Pixel] Raw query');
	    (_console = console).log.apply(_console, ['With data: '].concat(args));
	    console.groupEnd();
	  }
	  (_window = window).fbq.apply(_window, args);
	};

	var install = function install(Vue) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var router = options.router,
	      debug = options.debug,
	      excludeRoutes = options.excludeRoutes,
	      appId = options.appId;


	  config.excludes = excludeRoutes || config.excludes;
	  config.debug = !!debug;

	  if (!Vue.analytics) {
	    Vue.analytics = {};
	  }

	  if (!Vue.prototype.$analytics) {
	    Vue.prototype.$analytics = {};
	  }

	  Vue.analytics.fbq = { init: init, event: event, query: query };
	  Vue.prototype.$analytics.fbq = { init: init, event: event, query: query };

	  if (appId) {
	    Vue.analytics.fbq.init(appId);
	  }

	  if (router) {
	    var excludes = config.excludes;


	    router.afterEach(function (_ref) {
	      var path = _ref.path,
	          name = _ref.name;

	      if (excludes.length && excludes.indexOf(name) !== -1) {
	        return;
	      }

	      Vue.analytics.fbq.event('PageView');
	    });
	  }
	};

	exports.default = { install: install };

/***/ })
/******/ ])
});
;