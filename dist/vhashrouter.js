window["vHashRouter"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vHashRouter = undefined;

var _handlers = __webpack_require__(3);

var _initStyles = __webpack_require__(8);

var _parseConfig = __webpack_require__(9);

var vHashRouter = exports.vHashRouter = {

  addedResources: [],

  init: function init(originalConfig) {

    var config = (0, _parseConfig.parseConfig)(originalConfig);

    (0, _initStyles.initStyles)();

    window.addEventListener('hashchange', (0, _handlers.onHashChangeHandler)(config));
    window.addEventListener('load', (0, _handlers.onLoadHandler)(config));
  },


  routeParams: []
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var foreach = exports.foreach = function foreach(arr, process) {
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


  var length = arr.length;

  for (var i = 0; i < length; i += 1) {

    process(arr[i], i, arr);

    if (i === length - 1) {

      done();
    }
  }
};

var makeRegex = exports.makeRegex = function makeRegex(string) {

  var expression = string.replace(/[-/\\^$*+?.()|[\]]/g, '\\$&').replace(/\$/g, '$$$$').replace(/{(.*?)}/g, '(.[^/]*)').replace(/^(.*)$/, '^$1$');

  return new RegExp(expression);
};

var sendXMLHttpRequest = exports.sendXMLHttpRequest = function sendXMLHttpRequest(url, success) {

  var xhttp = new XMLHttpRequest();
  var READY = 4;
  var OK = 200;

  xhttp.onreadystatechange = function () {

    if (this.readyState === READY && this.status === OK) {

      success(this.responseText);
    }
  };

  xhttp.open('GET', url, true);
  xhttp.send();

  return;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var activeHashClass = exports.activeHashClass = 'hr-active-hash';
var navPageSelector = exports.navPageSelector = 'hr-page';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onHashChangeHandler = exports.onLoadHandler = undefined;

var _route = __webpack_require__(4);

var onLoadHandler = exports.onLoadHandler = function onLoadHandler(config) {
  return function (event) {
    var hash = window.location.hash;


    if (!hash) {

      (0, _route.goToDefaultRoute)(config);
    } else {

      (0, _route.goToRoute)(config, hash, event);
    }
  };
};

var onHashChangeHandler = exports.onHashChangeHandler = function onHashChangeHandler(config) {
  return function (event) {

    (0, _route.goToRoute)(config, window.location.hash, event);
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToRoute = exports.goToDefaultRoute = undefined;

var _view = __webpack_require__(5);

var _index = __webpack_require__(0);

var findRouteConfig = function findRouteConfig(config, toRoute) {
  return config.routes.find(function (route) {
    return toRoute.match(route.hash);
  });
};

var setRouteParams = function setRouteParams(routeConfig, toRoute) {

  _index.vHashRouter.routeParams = toRoute.match(routeConfig.hash, toRoute);

  routeConfig.onNavigate();
};

var goToDefaultRoute = exports.goToDefaultRoute = function goToDefaultRoute(config) {

  if (config.defaultRoute) {

    window.location.hash = config.defaultRoute;
  }
};

var goToRoute = exports.goToRoute = function goToRoute(config, toRoute, event) {

  if (toRoute.indexOf('/') < 0) {

    return;
  }

  var routeConfig = findRouteConfig(config, toRoute);

  if (!routeConfig) {

    return;
  }

  event.preventDefault();

  setRouteParams(routeConfig, toRoute);

  (0, _view.changeView)(config, routeConfig);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeView = undefined;

var _literals = __webpack_require__(2);

var _resources = __webpack_require__(6);

var _utils = __webpack_require__(1);

var _content = __webpack_require__(7);

var hideAllViews = function hideAllViews() {

  var views = document.querySelectorAll('.' + _literals.navPageSelector);

  (0, _utils.foreach)(views, function (view) {

    view.classList.remove(_literals.activeHashClass);
  });
};

var showView = function showView(view) {

  view.classList.add(_literals.activeHashClass);
};

var changeView = exports.changeView = function changeView(config, routeConfig) {

  var view = document.querySelector('#' + routeConfig.viewId);

  hideAllViews();
  showView(view);

  (0, _content.setContent)(view, routeConfig);
  (0, _resources.addResources)(routeConfig);

  window.scrollTo(0, 0);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addResources = undefined;

var _utils = __webpack_require__(1);

var _index = __webpack_require__(0);

var addScriptTag = function addScriptTag(url) {

  var tag = document.createElement('SCRIPT');

  tag.type = 'text/javascript';
  tag.src = url;

  document.body.appendChild(tag);
};

var addStyleTag = function addStyleTag(url) {

  var tag = document.createElement('LINK');

  tag.rel = 'stylesheet';
  tag.href = url;

  document.head.appendChild(tag);
};

var addResources = exports.addResources = function addResources(routeConfig) {

  (0, _utils.foreach)(routeConfig.resources.scripts, function (script) {

    if (!_index.vHashRouter.addedResources.includes(script)) {

      addScriptTag(script);

      _index.vHashRouter.addedResources.push(script);
    }
  });

  (0, _utils.foreach)(routeConfig.resources.styles, function (style) {

    if (!_index.vHashRouter.addedResources.includes(style)) {

      addStyleTag(style);

      _index.vHashRouter.addedResources.push(style);
    }
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContent = undefined;

var _utils = __webpack_require__(1);

var _index = __webpack_require__(0);

var getContent = function getContent(url, view, onContentLoad) {

  (0, _utils.sendXMLHttpRequest)(url, function (content) {

    view.innerHTML = content;

    onContentLoad();
  });
};

var setContent = exports.setContent = function setContent(view, routeConfig) {

  if (!routeConfig.contentUrl) {

    return;
  }

  var url = encodeURIComponent(routeConfig.contentUrl);

  if (!_index.vHashRouter.addedResources.includes(url)) {

    getContent(url, view, routeConfig.onContentLoad);

    _index.vHashRouter.addedResources.push(url);
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initStyles = undefined;

var _literals = __webpack_require__(2);

var initStyles = exports.initStyles = function initStyles() {

  var style = document.createElement('style');

  style.innerHTML = '\n    .' + _literals.navPageSelector + ' {\n      display: none;\n    }\n\n    .' + _literals.navPageSelector + '.' + _literals.activeHashClass + ' {\n      display: block;\n    }\n  ';

  document.head.appendChild(style);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseConfig = undefined;

var _utils = __webpack_require__(1);

var defaultRouteConfig = {
  contentUrl: '',
  hash: '',
  onContentLoad: function onContentLoad() {},
  onNavigate: function onNavigate() {},
  resources: {
    scripts: [],
    styles: []
  },
  viewId: ''
};

var applyRouteHash = function applyRouteHash(routeConfig) {
  return Object.assign({}, routeConfig, { hash: (0, _utils.makeRegex)(routeConfig.hash) });
};

var extendRouteConfig = function extendRouteConfig(routeConfig) {
  return Object.assign({}, defaultRouteConfig, routeConfig, {
    resources: Object.assign({}, defaultRouteConfig.resources, routeConfig.resources)
  });
};

var parseConfig = exports.parseConfig = function parseConfig(config) {
  return Object.assign({}, config, {
    routes: config.routes.map(extendRouteConfig).map(applyRouteHash)
  });
};

/***/ })
/******/ ])["vHashRouter"];