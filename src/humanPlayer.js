import * as ship from "./Ship"
import * as dom from "./domFunctions"

class HumanPlayer {
    constructor(board) {

        this.board = board;
        this.Carrier = new ship.Ship(5, "Carrier", "player")
        this.Battleship = new ship.Ship(4, "Battleship", "player")
        this.Destroyer = new ship.Ship(3, "Destroyer", "player")
        this.Submarine = new ship.Ship(3, "Submarine", "player")
        this.PatrolBoat = new ship.Ship(2, "PatrolBoat", "player")

        this.deploy()
    }

    // deploy() {//static deployment
    //     this.board.deployShip(this.Carrier, "x", 0, 0, this.board.playerBoard)
    //     this.board.deployShip(this.Battleship, "y", 6, 0, this.board.playerBoard)
    //     this.board.deployShip(this.Destroyer, "x", 5, 1, this.board.playerBoard)
    //     this.board.deployShip(this.Submarine, "y", 3, 8, this.board.playerBoard)
    //     this.board.deployShip(this.PatrolBoat, "x", 9, 8, this.board.playerBoard)
    // }

    deploy() { //random deployment
        // this.board.randomDeployment(this.Carrier, this.board.playerBoard)
        // this.board.randomDeployment(this.Battleship, this.board.playerBoard)
        // this.board.randomDeployment(this.Destroyer, this.board.playerBoard)
        // this.board.randomDeployment(this.Submarine, this.board.playerBoard)
        // this.board.randomDeployment(this.PatrolBoat, this.board.playerBoard)

    }

    async attack(enemy) {
        return new Promise((resolve) => {
            document.addEventListener("click", (e) => {
                if (e.target.className === "cell_enemy" && (this.fleetStatus() !== 0 && enemy.fleetStatus() !== 0)) {
                    e.target.style.backgroundColor = "black"
                    this.fireOnTarget(e.target.id, enemy)
                    resolve(enemy.attack(this));
                }
            });
        });
    }


    fireOnTarget(e, enemy) {
        let lat = e.substring(0, 1)
        let lon = e.substring(2)
        if (this.board.enemyBoard[lat][lon].shotTaken === true) {
            console.log("cannot fire on the same cell")
            return false;
        }
        console.log("fired upon lat:" + lat + " lon:" + lon)
        this.board.enemyBoard[lat][lon].shotTaken = true;
        if (this.board.enemyBoard[lat][lon].hasShip) {
            enemy[this.board.enemyBoard[lat][lon].shipProperties].hit()
        } else {
            console.log("miss")
        }
    }
    fleetStatus() {
        let status = this.Carrier.getLength() +
            this.Battleship.getLength() +
            this.Destroyer.getLength() +
            this.Submarine.getLength() +
            this.PatrolBoat.getLength();
        if (status == 0) {
            console.log("GAMEOVER")
        }
        return status
    }
}

export { HumanPlayer }