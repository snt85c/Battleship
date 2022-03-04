const board = document.getElementById("board")
const enemyBoard = document.getElementById("enemyBoard")
const rotate = document.getElementById("rotate")

let axis = "y"

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

rotate.onclick = () => {
    axis = axis == "y" ? "x" : "y";
    console.log(axis)
}

function dragDrop(player, board) {
    var dragged;

    document.addEventListener("dragstart", function(event) {
        dragged = event.target;
        event.target.style.height = 30 * player[dragged.id].getLength() + "px"
        if (axis == "x") {
            event.target.style.transform = "rotate(90deg)"; ///rotate flips the image in a bad way. maybe use an already flipped image
        } else {
            event.target.style.transform = "rotate(0deg)";
        }
        if (dragged.id == "Carrier") {
            event.target.style.marginLeft = "-7px"
        }
    }, false);


    document.addEventListener("dragend", function(event) {
        // reset the transparency
        event.target.style.opacity = "";
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", function(event) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);


    document.addEventListener("dragenter", (event) => {
        if (event.target.className == "cell_player") {
            event.target.style.background = "purple";
        }

    }, false);

    document.addEventListener("dragleave", function(event) {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.className == "cell_player") {
            event.target.style.background = "";
        }
    }, false);

    document.addEventListener("drop", function(event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (event.target.className == "cell_player") {
            event.target.style.background = "";
            let lat = parseInt(event.target.id.substring(0, 1))
            let lon = parseInt(event.target.id.substring(2))
            if (board.deployShip(player[dragged.id], axis, lat, lon, board.playerBoard)) {
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
            }
        }
    }, false);


}





export { populateBoard, dragDrop }