const board = document.getElementById("board")
const enemyBoard = document.getElementById("enemyBoard")

function populateBoard(passedBoard, player) {
    for (let i = 0; i <= 9; i++) {
        let row = document.createElement("div")
        row.setAttribute("id", "row")

        for (let j = 0; j <= 9; j++) {
            let cell = document.createElement("div")
            cell.setAttribute("id", "cell")
            if (passedBoard[i][j].hasShip) {
                cell.textContent = "X"
                cell.style.color = "red"
            } else {
                cell.textContent = ""
            }
            row.appendChild(cell)
        }
        if (player === "player") {
            board.appendChild(row);
        } else {
            enemyBoard.appendChild(row)
        }
    }
}


export { populateBoard }