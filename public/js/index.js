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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Modules/Input.ts":
/*!******************************!*\
  !*** ./src/Modules/Input.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Input; });\nclass Input {\n    static get instance() {\n        if (!this._instance) {\n            this._instance = new Input();\n        }\n        return this._instance;\n    }\n    //#endregion\n    // Methods\n    init(SimConfig) { }\n}\n\n\n//# sourceURL=webpack:///./src/Modules/Input.ts?");

/***/ }),

/***/ "./src/Modules/Processor.ts":
/*!**********************************!*\
  !*** ./src/Modules/Processor.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Processor; });\nclass Processor {\n    constructor() {\n        //#endregion\n        // Sim vars\n        this._gravity = 0;\n        this._deltaTime = 1;\n        this._spacescale = 1;\n    }\n    static get instance() {\n        if (!this._instance) {\n            this._instance = new Processor();\n        }\n        return this._instance;\n    }\n    // Methods\n    init(simConfig) {\n        this._gravity = simConfig.gravity;\n        this._deltaTime = simConfig.deltaTime;\n        this._spacescale = simConfig.spaceScale;\n    }\n    processSimObjects(simObjects) {\n        simObjects.forEach((simObject) => {\n            this.processSimObject(simObject);\n        });\n    }\n    processSimObject(simObject) {\n        simObject.position.x +=\n            (simObject.vel.x * this._deltaTime) / this._spacescale;\n        simObject.position.y +=\n            (simObject.vel.y * this._deltaTime) / this._spacescale;\n        simObject.vel.y += (this._gravity * this._deltaTime) / this._spacescale;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Modules/Processor.ts?");

/***/ }),

/***/ "./src/Modules/Renderer.ts":
/*!*********************************!*\
  !*** ./src/Modules/Renderer.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Renderer; });\nclass Renderer {\n    constructor() {\n        //#endregion\n        // Canvas\n        this._canvas = null;\n        this._ctx = null;\n        // Vars\n        this._spaceScale = 1;\n        this._root = {\n            x: 0,\n            y: 0,\n        };\n    }\n    static get instance() {\n        if (!this._instance) {\n            this._instance = new Renderer();\n        }\n        return this._instance;\n    }\n    // Methods\n    init(simConfig) {\n        this._canvas = simConfig.canvas;\n        this._ctx = this._canvas.getContext('2d');\n        this._canvas.width = simConfig.width;\n        this._canvas.height = simConfig.height;\n        this._spaceScale = simConfig.spaceScale;\n        this._root = {\n            x: 0,\n            y: this._canvas.height,\n        };\n        this._canvas.getContext('2d');\n    }\n    clear() {\n        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);\n    }\n    renderSimObjects(simObjects) {\n        simObjects.forEach((simObject) => {\n            this.renderSimObject(simObject);\n        });\n    }\n    renderSimObject(simObject) {\n        this._ctx.beginPath();\n        this._ctx.arc(this._root.x + simObject.position.x, this._root.y - simObject.position.y, simObject.rad * this._spaceScale, 0, 2 * Math.PI);\n        this._ctx.fill();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Modules/Renderer.ts?");

/***/ }),

/***/ "./src/Modules/Sim.ts":
/*!****************************!*\
  !*** ./src/Modules/Sim.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sim; });\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ \"./src/Modules/Input.ts\");\n/* harmony import */ var _Processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Processor */ \"./src/Modules/Processor.ts\");\n/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ \"./src/Modules/Renderer.ts\");\n\n\n\nclass Sim {\n    constructor() {\n        //#endregion\n        // Configuration\n        this._config = null;\n        // Renderer and processor\n        this._renderer = _Renderer__WEBPACK_IMPORTED_MODULE_2__[\"default\"].instance;\n        this._processor = _Processor__WEBPACK_IMPORTED_MODULE_1__[\"default\"].instance;\n        this._input = _Input__WEBPACK_IMPORTED_MODULE_0__[\"default\"].instance;\n        // Sim objects\n        this._simObjects = [];\n        // Default simulation config\n        this._defaultSimConfig = {\n            canvas: document.querySelector('canvas'),\n            width: 300,\n            height: 300,\n            gravity: -9.81,\n            spaceScale: 0.05,\n            deltaTime: 0.001,\n        };\n    }\n    static get instance() {\n        if (!this._instance) {\n            this._instance = new Sim();\n        }\n        return this._instance;\n    }\n    // Methods\n    init(simConfig = null) {\n        this._config = simConfig ? simConfig : this._defaultSimConfig;\n        this._renderer.init(this._config);\n        this._processor.init(this._config);\n        this._input.init(this._config);\n        this.initMainloop();\n    }\n    initMainloop() {\n        this._simObjects.push({\n            position: {\n                x: 150,\n                y: 150,\n            },\n            vel: {\n                x: 0,\n                y: 0,\n            },\n            rad: 150\n        });\n        const mainloop = () => {\n            this._renderer.clear();\n            this._processor.processSimObjects(this._simObjects);\n            this._renderer.renderSimObjects(this._simObjects);\n        };\n        setInterval(mainloop, this._config.deltaTime * 1000);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Modules/Sim.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Modules_Sim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/Sim */ \"./src/Modules/Sim.ts\");\n\nconst sim = _Modules_Sim__WEBPACK_IMPORTED_MODULE_0__[\"default\"].instance;\nsim.init();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });