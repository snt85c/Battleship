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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n\n    constructor(length, ship_class, owner) {\n        this.length = length;\n        this.ship_class = ship_class\n        this.owner = owner;\n    }\n\n    getLength() {\n        return this.length;\n    }\n\n    getOwner() {\n        return this.owner;\n    }\n\n    getClass() {\n        return this.ship_class;\n    }\n\n    hit() {\n        this.length--\n            if (!this.isSunk()) {\n                console.log(\"DIRECT HIT on \" + this.getOwner() + \" \" + this.getClass())\n            } else {\n                console.log(this.getOwner() + \" \" + this.getClass() + \" is SUNK\")\n            }\n    }\n\n    isSunk() {\n        return this.length === 0 ? true : false;\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/Ship.js?");

/***/ }),

/***/ "./src/boardController.js":
/*!********************************!*\
  !*** ./src/boardController.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"boardController\": () => (/* binding */ boardController)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n\n\nclass Cell {\n    constructor() {\n        this.shotTaken = false\n        this.hasShip = false;\n    }\n}\n\nclass boardController {\n\n    constructor() {\n        this.playerBoard = []\n        this.enemyBoard = []\n        this.initialize()\n    }\n\n    initialize() {\n        for (let i = 0; i < 10; i++) {\n            this.playerBoard[i] = []\n            this.enemyBoard[i] = []\n            for (let j = 0; j < 10; j++) {\n                this.playerBoard[i][j] = new Cell()\n                this.enemyBoard[i][j] = new Cell()\n            }\n        }\n    }\n\n    checkShipPositioning(ship, axis, lat, lon, board) {\n        switch (axis) {\n            case \"x\":\n                if (ship.getLength() + lon > 10) {\n\n                    return false;\n                }\n                for (let i = 0; i < ship.getLength(); i++) {\n                    if (board[lat][lon + i].hasShip) {\n                        return false\n\n                    }\n                }\n                return true;\n\n            case \"y\":\n                if (ship.getLength() + lat > 10) {\n                    return false;\n                }\n                for (let i = 0; i < ship.getLength(); i++) {\n                    if (board[lat + i][lon].hasShip) {\n                        return false\n                    }\n                }\n                return true;\n        }\n    }\n\n    deployShip(ship, axis, lat, lon, board) {\n        if (this.checkShipPositioning(ship, axis, lat, lon, board)) {\n            for (let i = 0; i < ship.getLength(); i++) {\n                if (axis == \"x\") {\n                    board[lat][lon + i].hasShip = true;\n                    board[lat][lon + i].shipProperties = ship.getClass();\n                    board[lat][lon + i].shipLength = ship.getLength();\n                    board[lat][lon + i].shipAxis = axis;\n                }\n                if (axis == \"y\") {\n                    board[lat + i][lon].hasShip = true;\n                    board[lat + i][lon].shipProperties = ship.getClass();\n                    board[lat + i][lon].shipLength = ship.getLength();\n                    board[lat + i][lon].shipAxis = axis\n\n                }\n            }\n            return true\n        }\n        return false\n    }\n\n    random(n) {\n        return Math.floor(Math.random() * n);\n    }\n\n    randomAXIS() {\n        const AXIS = [\"x\", \"y\"]\n        return AXIS[this.random(2)]\n    }\n\n    randomDeployment(ship, board) {\n        let unassigned = true;\n        while (unassigned) {\n            if (this.deployShip(ship, this.randomAXIS(), this.random(9), this.random(9), board)) {\n                unassigned = false;\n            }\n        }\n\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/boardController.js?");

/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBoard\": () => (/* binding */ createBoard),\n/* harmony export */   \"populateBoard\": () => (/* binding */ populateBoard),\n/* harmony export */   \"dragDrop\": () => (/* binding */ dragDrop),\n/* harmony export */   \"buttonFunctions\": () => (/* binding */ buttonFunctions),\n/* harmony export */   \"hitOrMiss\": () => (/* binding */ hitOrMiss)\n/* harmony export */ });\nconst board = document.getElementById(\"board\")\nconst enemyBoard = document.getElementById(\"enemyBoard\")\nlet shipcontainer = document.getElementById(\"shipcontainer\")\n\nconst rotate = document.getElementById(\"rotate\")\nconst reset = document.getElementById(\"reset\")\nconst random = document.getElementById(\"random\")\nconst start = document.getElementById(\"start\")\n\nlet fleet = document.querySelectorAll(\".ship\")\n\nlet shipclass = [\"Carrier\", \"Battleship\", \"Destroyer\", \"Submarine\", \"PatrolBoat\"]\nlet axis = \"y\"\n\n//dinamically generate an empty board\nfunction createBoard(playerBoard, player) {\n    for (let i = 0; i <= 9; i++) {\n        let row = document.createElement(\"div\");\n        row.setAttribute(\"id\", \"row_\" + player)\n        for (let j = 0; j <= 9; j++) {\n            let cell = document.createElement(\"div\")\n            cell.classList.add(\"cell_\" + player)\n            cell.setAttribute(\"id\", i + \"/\" + j + \"_\" + player.substring(0, 1))\n            row.appendChild(cell)\n        }\n        if (player == \"player\") {\n            board.appendChild(row)\n        } else {\n            enemyBoard.appendChild(row)\n        }\n    }\n    if (player == \"player\") {\n        populateBoard(playerBoard, player)\n    }\n}\n\n//populate the screen with data from the player board.\nfunction populateBoard(board, player) {\n    let shipclass = [\"Carrier\", \"Battleship\", \"Destroyer\", \"Submarine\", \"PatrolBoat\"]\n    for (let i = 0; i <= 9; i++) {\n        for (let j = 0; j <= 9; j++) {\n            if (board[i][j].hasShip && shipclass.includes(board[i][j].shipProperties)) {\n\n                let ship = board[i][j].shipProperties\n\n                let cell = document.getElementById(i + \"/\" + j + \"_\" + player.substring(0, 1))\n                let img = document.createElement(\"img\")\n                if (board[i][j].shipAxis == \"x\") {\n                    img.src = \"img/\" + ship + \"X.png\"\n                    img.style.width = 27 * board[i][j].shipLength + \"px\"\n                } else {\n                    img.src = \"img/\" + ship + \".png\"\n                    img.style.height = 27 * board[i][j].shipLength + \"px\"\n                }\n                shipclass = shipclass.filter((value) => {\n                    return value != ship;\n                })\n                if (ship == \"Carrier\") {\n                    img.classList.add(\"deployed_C\")\n\n                } else {\n                    img.classList.add(\"deployed\")\n                }\n                cell.appendChild(img)\n            }\n        }\n    }\n\n}\n\nfunction hitOrMiss(lat, lon, player, key) {\n    let cell = document.getElementById(lat + \"/\" + lon + \"_\" + player.substring(0, 1))\n    let dot = document.createElement(\"img\")\n    dot.setAttribute(\"id\", \"dot\")\n\n    if (key == \"hit\") {\n        dot.src = \"img/red.png\"\n        cell.appendChild(dot)\n        return\n    }\n    if (key == \"miss\") {\n        dot.src = \"img/blue.png\"\n        cell.appendChild(dot)\n        return\n\n    }\n}\n\nfunction dragDrop(player, board) {\n    var dragged;\n\n    document.addEventListener(\"dragstart\", function(event) {\n        dragged = event.target;\n        if (axis == \"y\") {\n            event.target.style.height = 27 * player[dragged.id].getLength() + \"px\"\n\n        } else {\n            event.target.style.width = 27 * player[dragged.id].getLength() + \"px\"\n        }\n\n        if (dragged.id == \"Carrier\") {\n            event.target.style.marginLeft = \"-7px\"\n\n        } else {\n            event.target.style.marginBottom = \"-8px\"\n        }\n    }, false);\n\n    /* events fired on the drop targets */\n    document.addEventListener(\"dragover\", function(event) {\n        // prevent default to allow drop\n        event.preventDefault();\n    }, false);\n\n\n    document.addEventListener(\"dragenter\", (event) => {\n        if (event.target.className == \"cell_player\") {\n            event.target.style.background = \"purple\";\n        }\n\n    }, false);\n\n    document.addEventListener(\"dragleave\", function(event) {\n        // reset background of potential drop target when the draggable element leaves it\n        if (event.target.className == \"cell_player\") {\n            event.target.style.background = \"\";\n        }\n    }, false);\n\n    document.addEventListener(\"drop\", function(event) {\n        // prevent default action (open as link for some elements)\n        event.preventDefault();\n        // move dragged elem to the selected drop target\n        if (event.target.className == \"cell_player\") {\n            event.target.style.background = \"\";\n            let lat = parseInt(event.target.id.substring(0, 1))\n            let lon = parseInt(event.target.id.substring(2))\n            if (board.deployShip(player[dragged.id], axis, lat, lon, board.playerBoard)) {\n                document.getElementById(dragged.id).setAttribute(\"class\", \"deployed\")\n                event.target.appendChild(dragged);\n                fleet = document.querySelectorAll(\".ship\")\n            }\n        }\n    }, false);\n\n\n}\n\nfunction buttonFunctions(player, enemy, board) {\n\n    //resets every cells and rows, as well as replacing ships on screen if they have been dragged out of the menu\n    function resetDOM() {\n        document.querySelectorAll(\".cell_enemy\").forEach((cell) => {\n            cell.remove()\n        })\n        document.querySelectorAll(\".row_enemy\").forEach((row) => {\n            row.remove()\n        })\n        document.querySelectorAll(\".cell_player\").forEach((cell) => {\n            cell.remove()\n        })\n\n        document.querySelectorAll(\".row_player\").forEach((row) => {\n            row.remove()\n        })\n\n        document.querySelectorAll(\".ship\").forEach((ship) => {\n            ship.remove()\n        })\n\n        document.getElementById(\"shipcontainer\").style.flexDirection = \"row\"\n\n        shipclass.forEach((ship) => {\n            let img = document.createElement(\"img\");\n            img.src = \"img/\" + ship + \".png\";\n            img.draggable = \"true\"\n            img.setAttribute(\"id\", ship)\n            img.classList.add(\"ship\")\n            shipcontainer.appendChild(img);\n        })\n        board.initialize()\n    }\n\n    rotate.onclick = () => {\n        axis = axis == \"y\" ? \"x\" : \"y\";\n        if (axis == \"x\") {\n            fleet.forEach((ship) => {\n                document.getElementById(ship.id).src = \"img/\" + ship.id + \"X.png\"\n            })\n            document.getElementById(\"shipcontainer\").style.flexDirection = \"column\"\n        } else {\n            fleet.forEach((ship) => {\n                document.getElementById(ship.id).src = \"img/\" + ship.id + \".png\"\n            })\n            document.getElementById(\"shipcontainer\").style.flexDirection = \"row\"\n            document.getElementById(\"shipcontainer\").style.margin = \"10px\"\n        }\n    }\n\n    reset.onclick = () => {\n        resetDOM()\n        enemy.deploy();\n        createBoard(board.playerBoard, \"player\")\n        createBoard(board.enemyBoard, \"enemy\")\n        document.getElementById(\"shipcontainer\").style.display = \"flex\"\n\n    }\n\n    random.onclick = () => {\n        document.getElementById(\"shipcontainer\").style.display = \"none\"\n        resetDOM()\n        enemy.deploy();\n        player.deployRandom();\n        createBoard(board.playerBoard, \"player\")\n        createBoard(board.enemyBoard, \"enemy\")\n    }\n\n    start.onclick = () => {\n        player.attack(enemy)\n    }\n\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/domFunctions.js?");

/***/ }),

/***/ "./src/enemyPlayer.js":
/*!****************************!*\
  !*** ./src/enemyPlayer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"enemyPlayer\": () => (/* binding */ enemyPlayer)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domFunctions */ \"./src/domFunctions.js\");\n\n\n\nclass enemyPlayer {\n    constructor(board) {\n        this.board = board;\n\n        this.Carrier = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5, \"Carrier\", \"enemy\")\n        this.Battleship = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, \"Battleship\", \"enemy\")\n        this.Destroyer = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, \"Destroyer\", \"enemy\")\n        this.Submarine = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, \"Submarine\", \"enemy\")\n        this.PatrolBoat = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2, \"PatrolBoat\", \"enemy\")\n\n        this.deploy();\n    }\n\n    random(n) {\n        return Math.floor(Math.random() * n);\n    }\n\n    deploy() {\n        this.board.randomDeployment(this.Carrier, this.board.enemyBoard)\n        this.board.randomDeployment(this.Battleship, this.board.enemyBoard)\n        this.board.randomDeployment(this.Destroyer, this.board.enemyBoard)\n        this.board.randomDeployment(this.Submarine, this.board.enemyBoard)\n        this.board.randomDeployment(this.PatrolBoat, this.board.enemyBoard)\n    }\n\n    attack(player) {\n        let unassigned = true\n        while (unassigned) {\n            let lat = this.random(9)\n            let lon = this.random(9)\n            if (this.board.playerBoard[lat][lon].shotTaken == false) {\n                this.fireOnTarget(player, lat, lon)\n                unassigned = false;\n            }\n\n        }\n    }\n\n    fireOnTarget(player, lat, lon) {\n        if (this.board.playerBoard[lat][lon].shotTaken === true) {\n            console.log(\"cannot fire on the same cell\")\n            return false;\n        }\n        console.log(\"fired upon lat:\" + lat + \" lon:\" + lon)\n        this.board.playerBoard[lat][lon].shotTaken = true;\n        if (this.board.playerBoard[lat][lon].hasShip) {\n            player[this.board.playerBoard[lat][lon].shipProperties].hit()\n            _domFunctions__WEBPACK_IMPORTED_MODULE_1__.hitOrMiss(lat, lon, \"player\", \"hit\")\n\n        } else {\n            _domFunctions__WEBPACK_IMPORTED_MODULE_1__.hitOrMiss(lat, lon, \"player\", \"miss\")\n            console.log(\"miss\")\n        }\n        // let id = lat + \"/\" + lon + \"_p\";\n        // document.getElementById(id).style.backgroundColor = \"black\"\n    }\n\n    fleetStatus() {\n        let status = this.Carrier.getLength() +\n            this.Battleship.getLength() +\n            this.Destroyer.getLength() +\n            this.Submarine.getLength() +\n            this.PatrolBoat.getLength();\n        if (status == 0) {\n            console.log(\"GAMEOVER\")\n        }\n        return status\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/enemyPlayer.js?");

/***/ }),

/***/ "./src/humanPlayer.js":
/*!****************************!*\
  !*** ./src/humanPlayer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HumanPlayer\": () => (/* binding */ HumanPlayer)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domFunctions */ \"./src/domFunctions.js\");\n\n\n\nclass HumanPlayer {\n    constructor(board) {\n\n        this.board = board;\n        this.Carrier = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5, \"Carrier\", \"player\")\n        this.Battleship = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4, \"Battleship\", \"player\")\n        this.Destroyer = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, \"Destroyer\", \"player\")\n        this.Submarine = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3, \"Submarine\", \"player\")\n        this.PatrolBoat = new _Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2, \"PatrolBoat\", \"player\")\n\n        this.deploy()\n    }\n\n    // deploy() {//static deployment\n    //     this.board.deployShip(this.Carrier, \"x\", 0, 0, this.board.playerBoard)\n    //     this.board.deployShip(this.Battleship, \"y\", 6, 0, this.board.playerBoard)\n    //     this.board.deployShip(this.Destroyer, \"x\", 5, 1, this.board.playerBoard)\n    //     this.board.deployShip(this.Submarine, \"y\", 3, 8, this.board.playerBoard)\n    //     this.board.deployShip(this.PatrolBoat, \"x\", 9, 8, this.board.playerBoard)\n    // }\n\n    deploy() {\n\n    }\n\n    deployRandom() { //random deployment\n        this.board.randomDeployment(this.Carrier, this.board.playerBoard)\n        this.board.randomDeployment(this.Battleship, this.board.playerBoard)\n        this.board.randomDeployment(this.Destroyer, this.board.playerBoard)\n        this.board.randomDeployment(this.Submarine, this.board.playerBoard)\n        this.board.randomDeployment(this.PatrolBoat, this.board.playerBoard)\n    }\n\n    async attack(enemy) {\n        return new Promise((resolve) => {\n            document.addEventListener(\"click\", (e) => {\n                if (e.target.className === \"cell_enemy\" && (this.fleetStatus() !== 0 && enemy.fleetStatus() !== 0)) {\n                    // e.target.style.backgroundColor = \"black\"\n                    this.fireOnTarget(e.target, enemy)\n                    resolve(enemy.attack(this));\n                }\n            });\n        });\n    }\n\n\n    fireOnTarget(e, enemy) {\n        let coords = e.id.split(\"/\")\n        let lat = coords[0].substring(0, 1)\n        let lon = coords[1].substring(0, 1)\n\n        if (this.board.enemyBoard[lat][lon].shotTaken === true) {\n            console.log(\"cannot fire on the same cell\")\n            return false;\n        }\n        console.log(\"fired upon lat:\" + lat + \" lon:\" + lon)\n        this.board.enemyBoard[lat][lon].shotTaken = true;\n        if (this.board.enemyBoard[lat][lon].hasShip) {\n            enemy[this.board.enemyBoard[lat][lon].shipProperties].hit()\n            _domFunctions__WEBPACK_IMPORTED_MODULE_1__.hitOrMiss(lat, lon, \"enemy\", \"hit\")\n                // e.style.backgroundColor = \"red\"\n\n        } else {\n            console.log(\"miss\")\n            _domFunctions__WEBPACK_IMPORTED_MODULE_1__.hitOrMiss(lat, lon, \"enemy\", \"miss\")\n                // e.style.backgroundColor = \"blue\"\n\n        }\n    }\n    fleetStatus() {\n        let status = this.Carrier.getLength() +\n            this.Battleship.getLength() +\n            this.Destroyer.getLength() +\n            this.Submarine.getLength() +\n            this.PatrolBoat.getLength();\n        if (status == 0) {\n            console.log(\"GAMEOVER\")\n        }\n        return status\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/humanPlayer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _boardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boardController */ \"./src/boardController.js\");\n/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domFunctions */ \"./src/domFunctions.js\");\n/* harmony import */ var _src_enemyPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/enemyPlayer */ \"./src/enemyPlayer.js\");\n/* harmony import */ var _humanPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./humanPlayer */ \"./src/humanPlayer.js\");\n\n\n\n\n\nconst board = new _boardController__WEBPACK_IMPORTED_MODULE_0__.boardController()\nconst enemy = new _src_enemyPlayer__WEBPACK_IMPORTED_MODULE_2__.enemyPlayer(board);\nconst player = new _humanPlayer__WEBPACK_IMPORTED_MODULE_3__.HumanPlayer(board)\n\n_domFunctions__WEBPACK_IMPORTED_MODULE_1__.dragDrop(player, board)\n_domFunctions__WEBPACK_IMPORTED_MODULE_1__.createBoard(board.playerBoard, \"player\")\n_domFunctions__WEBPACK_IMPORTED_MODULE_1__.createBoard(board.enemyBoard, \"enemy\")\n_domFunctions__WEBPACK_IMPORTED_MODULE_1__.buttonFunctions(player, enemy, board)\n\nasync function init() {\n    player.attack(enemy)\n}\n\n// init()\n\nconsole.log({ playerBoard: board.playerBoard })\nconsole.log({ enemyBoard: board.enemyBoard })\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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