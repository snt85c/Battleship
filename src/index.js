import * as controller from "./gameController"
import * as ship from "./Ship"
import * as dom from "./domFunctions"

// 5 carrier
// 4 battleship
// 3 destroyer
// 3 submarine
// 2 patrol boat

const board = new controller.gameController()
const enemyBoard = new controller.gameController()

const carrier = new ship.Ship(5, "Carrier")
const battleship = new ship.Ship(4, "Battleship")
const destroyer = new ship.Ship(3, "Destroyer")
const submarine = new ship.Ship(3, "Submarine")
const patrolBoat = new ship.Ship(2, "Patrol Boat")


board.deployShip(carrier, "x", 0, 0)
board.deployShip(battleship, "y", 6, 0)
board.deployShip(destroyer, "x", 5, 1)
board.deployShip(submarine, "y", 3, 8)
board.deployShip(patrolBoat, "x", 9, 8)

dom.populateBoard(board.board, "player")
dom.populateBoard(enemyBoard.board, "enemy")

console.log(board.board)