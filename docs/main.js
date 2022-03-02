/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n\n    constructor(length, ship_class) {\n        this.length = length;\n        this.ship_class = ship_class\n    }\n\n    getLength() {\n        return this.length;\n    }\n\n    getClass() {\n        return this.ship_class;\n    }\n\n    hit() {\n        if (!this.isSunk()) {\n            this.length--\n        }\n    }\n\n    isSunk() {\n        return this.length == 0;\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/Ship.js?");

/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"populateBoard\": () => (/* binding */ populateBoard)\n/* harmony export */ });\nconst board = document.getElementById(\"board\")\nconst enemyBoard = document.getElementById(\"enemyBoard\")\n\nfunction populateBoard(passedBoard, player) {\n    for (let i = 0; i <= 9; i++) {\n        let row = document.createElement(\"div\")\n        row.setAttribute(\"id\", \"row\")\n\n        for (let j = 0; j <= 9; j++) {\n            let cell = document.createElement(\"div\")\n            cell.setAttribute(\"id\", \"cell\")\n            if (passedBoard[i][j].hasShip) {\n                cell.textContent = \"X\"\n                cell.style.color = \"red\"\n            } else {\n                cell.textContent = \"\"\n            }\n            row.appendChild(cell)\n        }\n        if (player === \"player\") {\n            board.appendChild(row);\n        } else {\n            enemyBoard.appendChild(row)\n        }\n    }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/domFunctions.js?");

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameController\": () => (/* binding */ gameController)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n\n\nclass Cell {\n    constructor() {\n        this.shotTaken = false\n        this.hasShip = false;\n    }\n}\n\nclass gameController {\n\n    constructor() {\n        this.board = []\n        this.initialize()\n    }\n\n    initialize() {\n        for (let i = 0; i < 10; i++) {\n            this.board[i] = []\n            for (let j = 0; j < 10; j++) {\n                this.board[i][j] = new Cell()\n            }\n        }\n    }\n\n    checkShipPositioning(ship, axis, lat, lon) {\n        switch (axis) {\n            case \"x\":\n                /**horizontal positioning */\n                if (ship.getLength() + lon > 10) {\n                    return false;\n                }\n                // if (ship.getLength() + lon <= 9) {\n                for (let i = 0; i < ship.getLength(); i++) {\n                    if (this.board[lat][lon + i].hasShip) {\n                        return false\n                    }\n                    // }\n                }\n                return true;\n\n            case \"y\":\n                /*vertical positioning */\n                if (ship.getLength() + lat > 10) {\n                    return false;\n                }\n                // if (ship.getLength() + lat <= 9) {\n                for (let i = 0; i < ship.getLength(); i++) {\n                    if (this.board[lat + i][lon].hasShip) {\n                        return false\n                    }\n                }\n                // }\n                return true;\n        }\n    }\n\n    deployShip(ship, axis, lat, lon) {\n        if (this.checkShipPositioning(ship, axis, lat, lon)) {\n            for (let i = 0; i < ship.getLength(); i++) {\n                if (axis == \"x\") {\n                    this.board[lat][lon + i].hasShip = true;\n                }\n                if (axis == \"y\") {\n                    this.board[lat + i][lon].hasShip = true;\n                }\n            }\n        }\n    }\n}\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/gameController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ \"./src/gameController.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domFunctions */ \"./src/domFunctions.js\");\n\n\n\n\n// 5 carrier\n// 4 battleship\n// 3 destroyer\n// 3 submarine\n// 2 patrol boat\n\nconst board = new _gameController__WEBPACK_IMPORTED_MODULE_0__.gameController()\nconst enemyBoard = new _gameController__WEBPACK_IMPORTED_MODULE_0__.gameController()\n\nconst carrier = new _Ship__WEBPACK_IMPORTED_MODULE_1__.Ship(5, \"Carrier\")\nconst battleship = new _Ship__WEBPACK_IMPORTED_MODULE_1__.Ship(4, \"Battleship\")\nconst destroyer = new _Ship__WEBPACK_IMPORTED_MODULE_1__.Ship(3, \"Destroyer\")\nconst submarine = new _Ship__WEBPACK_IMPORTED_MODULE_1__.Ship(3, \"Submarine\")\nconst patrolBoat = new _Ship__WEBPACK_IMPORTED_MODULE_1__.Ship(2, \"Patrol Boat\")\n\n\nboard.deployShip(carrier, \"x\", 0, 0)\nboard.deployShip(battleship, \"y\", 6, 0)\nboard.deployShip(destroyer, \"x\", 5, 1)\nboard.deployShip(submarine, \"y\", 3, 8)\nboard.deployShip(patrolBoat, \"x\", 9, 8)\n\n_domFunctions__WEBPACK_IMPORTED_MODULE_2__.populateBoard(board.board, \"player\")\n_domFunctions__WEBPACK_IMPORTED_MODULE_2__.populateBoard(enemyBoard.board, \"enemy\")\n\nconsole.log(board.board)\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;