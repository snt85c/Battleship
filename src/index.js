import * as controller from "./boardController"
import * as dom from "./domFunctions"
import * as enemyPlayer from "../src/enemyPlayer";
import * as HumanPlayer from "./humanPlayer"

const board = new controller.boardController()
const enemy = new enemyPlayer.enemyPlayer(board);
const player = new HumanPlayer.HumanPlayer(board)

dom.dragDrop(player, board)
dom.createBoard(board.playerBoard, "player")
dom.createBoard(board.enemyBoard, "enemy")
dom.buttonFunctions(player, enemy, board)

async function init() {
    player.attack(enemy)
}

init()

console.log({ playerBoard: board.playerBoard })
console.log({ enemyBoard: board.enemyBoard })