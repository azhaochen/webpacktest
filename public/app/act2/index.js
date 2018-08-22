/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app/act2/index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app/act2/index.js","app/comm/sc_library","app/comm/sc_comm"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/act2/index.js":
/*!***************************!*\
  !*** ./app/act2/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar dayjs = __webpack_require__(/*! dayjs */ \"../node_modules/dayjs/dayjs.min.js\"); //node modules\nconsole.log('from act2 w index.js:', dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'));\n\nvar loginjs = __webpack_require__(/*! comm/login.js */ \"./app/comm/login.js\");\nvar jqcookie = __webpack_require__(/*! library/jquery.cookie.js */ \"./library/jquery.cookie.js\");\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\nvar qrcode = __webpack_require__(/*! library/qrcode.js */ \"./library/qrcode.js\");\n\nvar ma = location.href.match(/adtag=(.*?)(&|$)/);\nvar adtag = '';\nif (ma && ma[1]) {\n    adtag = ma[1];\n}\nif (adtag.length > 25 || adtag.match(/[^0-9a-zA-Z_\\-]/g) != null) {\n    adtag = '';\n}\n\nwindow.gotoApp = function () {\n    window.location.href = 'http://igame.qq.com/pvp/share/jump.php?op=99&closeflag=1&adtag=' + adtag;\n};\n\n//����ȯ�̳�\nwindow.gotoFuli = function () {\n    window.location.href = \"http://igame.qq.com/pvp/share/jump.php?op=12&closeflag=1&adtag=\" + adtag;\n};\n\n//�ص���̨\nwindow.gotoArena = function () {\n    window.location.href = \"http://igame.qq.com/pvp/share/jump.php?op=10&closeflag=1&extras2=9&adtag=\" + adtag;\n};\n\n//�ر���̨\nwindow.gotoLandArena = function () {\n    window.location.href = \"http://igame.qq.com/pvp/share/jump.php?op=11&closeflag=1&adtag=\" + adtag;\n};\n\n$('body').ready(function () {\n    alert('ready');\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYWN0Mi9pbmRleC5qcz83YzA0Il0sIm5hbWVzIjpbImRheWpzIiwicmVxdWlyZSIsImNvbnNvbGUiLCJsb2ciLCJmb3JtYXQiLCJsb2dpbmpzIiwianFjb29raWUiLCIkIiwicXJjb2RlIiwibWEiLCJsb2NhdGlvbiIsImhyZWYiLCJtYXRjaCIsImFkdGFnIiwibGVuZ3RoIiwid2luZG93IiwiZ290b0FwcCIsImdvdG9GdWxpIiwiZ290b0FyZW5hIiwiZ290b0xhbmRBcmVuYSIsInJlYWR5IiwiYWxlcnQiXSwibWFwcGluZ3MiOiI7O0FBRUMsSUFBSUEsUUFBUSxtQkFBQUMsQ0FBUSxpREFBUixDQUFaLEMsQ0FBK0I7QUFDL0JDLFFBQVFDLEdBQVIsQ0FBWSx1QkFBWixFQUFvQ0gsUUFBUUksTUFBUixDQUFlLGlDQUFmLENBQXBDOztBQUVBLElBQUlDLFVBQVUsbUJBQUFKLENBQVEsMENBQVIsQ0FBZDtBQUNBLElBQUlLLFdBQVcsbUJBQUFMLENBQVEsNERBQVIsQ0FBZjtBQUNBLElBQU1NLElBQUksbUJBQUFOLENBQVEsc0JBQVIsQ0FBVjtBQUNBLElBQUlPLFNBQVUsbUJBQUFQLENBQVEsOENBQVIsQ0FBZDs7QUFFRyxJQUFJUSxLQUFLQyxTQUFTQyxJQUFULENBQWNDLEtBQWQsQ0FBb0Isa0JBQXBCLENBQVQ7QUFDQSxJQUFJQyxRQUFRLEVBQVo7QUFDQSxJQUFHSixNQUFNQSxHQUFHLENBQUgsQ0FBVCxFQUFlO0FBQ1hJLFlBQVFKLEdBQUcsQ0FBSCxDQUFSO0FBQ0g7QUFDRCxJQUFHSSxNQUFNQyxNQUFOLEdBQWEsRUFBYixJQUFtQkQsTUFBTUQsS0FBTixDQUFZLGtCQUFaLEtBQWlDLElBQXZELEVBQTREO0FBQ3hEQyxZQUFRLEVBQVI7QUFDSDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQixZQUFVO0FBQ3ZCRCxXQUFPTCxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixvRUFBa0VFLEtBQXpGO0FBQ0gsQ0FGRDs7QUFJQTtBQUNBRSxPQUFPRSxRQUFQLEdBQWtCLFlBQVU7QUFDeEJGLFdBQU9MLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLG9FQUFrRUUsS0FBekY7QUFDSCxDQUZEOztBQUlBO0FBQ0FFLE9BQU9HLFNBQVAsR0FBbUIsWUFBVTtBQUN6QkgsV0FBT0wsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsOEVBQTRFRSxLQUFuRztBQUNILENBRkQ7O0FBSUE7QUFDQUUsT0FBT0ksYUFBUCxHQUF1QixZQUFVO0FBQzdCSixXQUFPTCxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixvRUFBa0VFLEtBQXpGO0FBQ0gsQ0FGRDs7QUFJSE4sRUFBRSxNQUFGLEVBQVVhLEtBQVYsQ0FBZ0IsWUFBVTtBQUN6QkMsVUFBTSxPQUFOO0FBQ0EsQ0FGRCIsImZpbGUiOiIuL2FwcC9hY3QyL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cdHZhciBkYXlqcyA9IHJlcXVpcmUoJ2RheWpzJyk7XHRcdC8vbm9kZSBtb2R1bGVzXHJcblx0Y29uc29sZS5sb2coJ2Zyb20gYWN0MiB3IGluZGV4LmpzOicsZGF5anMoKS5mb3JtYXQoJ3tZWVlZfSBNTS1ERFRISDptbTpzcyBTU1MgW1pdIEEnKSk7XHRcclxuXHJcblx0dmFyIGxvZ2luanMgPSByZXF1aXJlKCdjb21tL2xvZ2luLmpzJyk7XHJcblx0dmFyIGpxY29va2llID0gcmVxdWlyZSgnbGlicmFyeS9qcXVlcnkuY29va2llLmpzJyk7XHJcblx0Y29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XHJcblx0dmFyIHFyY29kZSAgPSByZXF1aXJlKCdsaWJyYXJ5L3FyY29kZS5qcycpO1xyXG5cdFxyXG4gICAgdmFyIG1hID0gbG9jYXRpb24uaHJlZi5tYXRjaCgvYWR0YWc9KC4qPykoJnwkKS8pO1xyXG4gICAgdmFyIGFkdGFnID0gJyc7XHJcbiAgICBpZihtYSAmJiBtYVsxXSl7XHJcbiAgICAgICAgYWR0YWcgPSBtYVsxXTtcclxuICAgIH1cclxuICAgIGlmKGFkdGFnLmxlbmd0aD4yNSB8fCBhZHRhZy5tYXRjaCgvW14wLTlhLXpBLVpfXFwtXS9nKSE9bnVsbCl7XHJcbiAgICAgICAgYWR0YWcgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuZ290b0FwcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cDovL2lnYW1lLnFxLmNvbS9wdnAvc2hhcmUvanVtcC5waHA/b3A9OTkmY2xvc2VmbGFnPTEmYWR0YWc9JythZHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvL++/ve+/ve+/ve+/vciv77+9zLPvv71cclxuICAgIHdpbmRvdy5nb3RvRnVsaSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHA6Ly9pZ2FtZS5xcS5jb20vcHZwL3NoYXJlL2p1bXAucGhwP29wPTEyJmNsb3NlZmxhZz0xJmFkdGFnPVwiK2FkdGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v77+92LXvv73vv73vv73MqFxyXG4gICAgd2luZG93LmdvdG9BcmVuYSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHA6Ly9pZ2FtZS5xcS5jb20vcHZwL3NoYXJlL2p1bXAucGhwP29wPTEwJmNsb3NlZmxhZz0xJmV4dHJhczI9OSZhZHRhZz1cIithZHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvL++/vdix77+977+977+9zKhcclxuICAgIHdpbmRvdy5nb3RvTGFuZEFyZW5hID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2lnYW1lLnFxLmNvbS9wdnAvc2hhcmUvanVtcC5waHA/b3A9MTEmY2xvc2VmbGFnPTEmYWR0YWc9XCIrYWR0YWc7XHJcbiAgICB9O1xyXG5cdFxyXG5cdCQoJ2JvZHknKS5yZWFkeShmdW5jdGlvbigpe1xyXG5cdFx0YWxlcnQoJ3JlYWR5Jyk7XHJcblx0fSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./app/act2/index.js\n");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIj9jZDBjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImpxdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///jquery\n");

/***/ })

/******/ });