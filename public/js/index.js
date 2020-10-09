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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Setup\nconst canvas = document.getElementById('simcanvas');\nconst ctx = canvas.getContext('2d');\nconst toggleTrajectory = (document.getElementById('toggleTrajectory'));\nconst radiusNumber = document.getElementById('radiusNumber');\ncanvas.height = 500;\ncanvas.width = 500;\nconst gravity = -9.83;\nconst simObjects = [];\nconst spaceScale = 0.025;\nlet radius = 300;\nconst dt = 0.001; // In seconds\nlet firstPos;\nradiusNumber.value = radius.toString();\nconst scaleP = document.getElementById(\"scaleP\");\nscaleP.innerHTML = `Space scale: ${spaceScale}[px/m]`;\n// Rendering\nconst renderSimObject = (simObject) => {\n    ctx.beginPath();\n    ctx.arc(simObject.position.x, canvas.height - simObject.position.y, simObject.rad * spaceScale, 0, 360);\n    ctx.stroke();\n};\nconst renderSimObjects = (simObjects) => {\n    simObjects.forEach((simObject) => {\n        renderSimObject(simObject);\n    });\n};\nconst renderSimObjectTrajectory = (simObject) => {\n    ctx.beginPath();\n    ctx.moveTo(simObject.position.x, canvas.height - simObject.position.y);\n    ctx.lineTo(simObject.position.x + simObject.vel.x, canvas.height - simObject.position.y - simObject.vel.y);\n    ctx.stroke();\n};\nconst renderSimobjectsTrajectories = (simObject) => {\n    simObjects.forEach((simObject) => {\n        renderSimObjectTrajectory(simObject);\n    });\n};\n// Physics\nconst processSimObject = (simObject) => {\n    simObject.position.x += simObject.vel.x * spaceScale;\n    simObject.position.y += simObject.vel.y * spaceScale;\n    simObject.vel.y += (gravity * dt) / spaceScale;\n};\nconst processSimObjects = (simObjects) => {\n    simObjects.forEach((simObject, index) => {\n        if (simObject.position.y < 0) {\n            simObjects.splice(index, 1);\n        }\n        else {\n            processSimObject(simObject);\n        }\n    });\n};\n// Settings\nradiusNumber.addEventListener('change', (e) => {\n    radius = parseInt(radiusNumber.value);\n});\n// Main\ncanvas.addEventListener('mousedown', (e) => {\n    firstPos = {\n        x: e.offsetX,\n        y: canvas.height - e.offsetY,\n    };\n});\ncanvas.addEventListener('mouseup', (e) => {\n    let secondPos = {\n        x: e.offsetX,\n        y: canvas.height - e.offsetY,\n    };\n    simObjects.push({\n        position: {\n            x: firstPos.x,\n            y: firstPos.y,\n        },\n        vel: {\n            x: (secondPos.x - firstPos.x),\n            y: (secondPos.y - firstPos.y),\n        },\n        rad: radius,\n    });\n});\nconst mainloop = () => {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    processSimObjects(simObjects);\n    renderSimObjects(simObjects);\n    if (toggleTrajectory.checked) {\n        renderSimobjectsTrajectories(simObjects);\n    }\n};\nsetInterval(mainloop, dt * 1000);\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });