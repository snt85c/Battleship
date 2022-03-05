const board = document.getElementById("board")
const enemyBoard = document.getElementById("enemyBoard")
let shipcontainer = document.getElementById("shipcontainer")

const rotate = document.getElementById("rotate")
const reset = document.getElementById("reset")
const random = document.getElementById("random")

let fleet = document.querySelectorAll(".ship")

let shipclass = ["Carrier", "Battleship", "Destroyer", "Submarine", "PatrolBoat"]
let axis = "y"

//dinamically generate an empty board
function createBoard(playerBoard, player) {
    for (let i = 0; i <= 9; i++) {
        let row = document.createElement("div");
        row.setAttribute("id", "row_" + player)
        for (let j = 0; j <= 9; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell_" + player)
            cell.setAttribute("id", i + "/" + j + "_" + player.substring(0, 1))
            row.appendChild(cell)
        }
        if (player == "player") {
            board.appendChild(row)
        } else {
            enemyBoard.appendChild(row)
        }
    }
    populateBoard(playerBoard, player)
}

//populate the screen with data from the player board.
function populateBoard(board, player) {
    let shipclass = ["Carrier", "Battleship", "Destroyer", "Submarine", "PatrolBoat"]
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            if (board[i][j].hasShip && shipclass.includes(board[i][j].shipProperties)) {

                let ship = board[i][j].shipProperties

                let cell = document.getElementById(i + "/" + j + "_" + player.substring(0, 1))
                let img = document.createElement("img")
                if (board[i][j].shipAxis == "x") {
                    img.src = "img/" + ship + "X.png"
                    img.style.width = 27 * board[i][j].shipLength + "px"
                        // img.style.marginTop = "10px"
                        // if (ship == "Carrier") {
                        //     img.style.marginTop = "-15px"
                        // }
                } else {
                    img.src = "img/" + ship + ".png"
                    img.style.height = 27 * board[i][j].shipLength + "px"
                        // img.style.marginLeft = "-10px"
                        // if (ship == "Carrier") {
                        //     img.style.marginLeft = "-20px"

                    // }
                }
                shipclass = shipclass.filter((value) => {
                    return value != ship;
                })
                cell.appendChild(img)
            }
        }
    }

}


function dragDrop(player, board) {
    var dragged;

    document.addEventListener("dragstart", function(event) {
        dragged = event.target;
        if (axis == "y") {
            event.target.style.height = 27 * player[dragged.id].getLength() + "px"

        } else {
            event.target.style.width = 27 * player[dragged.id].getLength() + "px"
        }

        if (dragged.id == "Carrier") {
            event.target.style.marginLeft = "-7px"

        } else {
            event.target.style.marginBottom = "-8px"
        }
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
                document.getElementById(dragged.id).setAttribute("class", "deployed")
                event.target.appendChild(dragged);
                fleet = document.querySelectorAll(".ship")
            }
        }
    }, false);


}

function buttonFunctions(player, enemy, board) {

    //resets every cells and rows, as well as replacing ships on screen if they have been dragged out of the menu
    function resetDOM() {
        document.querySelectorAll(".cell_enemy").forEach((cell) => {
            cell.remove()
        })
        document.querySelectorAll(".row_enemy").forEach((row) => {
            row.remove()
        })
        document.querySelectorAll(".cell_player").forEach((cell) => {
            cell.remove()
        })

        document.querySelectorAll(".row_player").forEach((row) => {
            row.remove()
        })

        document.querySelectorAll(".ship").forEach((ship) => {
            ship.remove()
        })

        document.getElementById("shipcontainer").style.flexDirection = "row"

        shipclass.forEach((ship) => {
            let img = document.createElement("img");
            img.src = "img/" + ship + ".png";
            img.draggable = "true"
            img.setAttribute("id", ship)
            img.classList.add("ship")
            shipcontainer.appendChild(img);
        })
        board.initialize()
    }

    rotate.onclick = () => {
        axis = axis == "y" ? "x" : "y";
        if (axis == "x") {
            fleet.forEach((ship) => {
                document.getElementById(ship.id).src = "img/" + ship.id + "X.png"
            })
            document.getElementById("shipcontainer").style.flexDirection = "column"
        } else {
            fleet.forEach((ship) => {
                document.getElementById(ship.id).src = "img/" + ship.id + ".png"
            })
            document.getElementById("shipcontainer").style.flexDirection = "row"
            document.getElementById("shipcontainer").style.margin = "10px"
        }
    }

    reset.onclick = () => {
        resetDOM()
        enemy.deploy();
        createBoard(board.playerBoard, "player")
        createBoard(board.enemyBoard, "enemy")
    }

    random.onclick = () => {
        resetDOM()
        enemy.deploy();
        player.deployRandom();
        createBoard(board.playerBoard, "player")
        createBoard(board.enemyBoard, "enemy")
    }
}

export { createBoard, populateBoard, dragDrop, buttonFunctions }