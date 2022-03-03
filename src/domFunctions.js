const board = document.getElementById("board")
const enemyBoard = document.getElementById("enemyBoard")

function populateBoard(passedBoard, player) {
    for (let i = 0; i <= 9; i++) {

        let row = document.createElement("div")
        row.setAttribute("id", "row")

        for (let j = 0; j <= 9; j++) {
            let cell = document.createElement("div")
            cell.setAttribute("class", "cell_" + player)
            cell.setAttribute("id", i + "/" + j)
            if (passedBoard[i][j].hasShip) {
                cell.textContent = passedBoard[i][j].shipProperties.substring(0, 1)
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