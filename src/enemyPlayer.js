import * as ship from "./Ship"

class enemyPlayer {
    constructor(board) {
        this.board = board;

        this.Carrier = new ship.Ship(5, "Carrier", "enemy")
        this.Battleship = new ship.Ship(4, "Battleship", "enemy")
        this.Destroyer = new ship.Ship(3, "Destroyer", "enemy")
        this.Submarine = new ship.Ship(3, "Submarine", "enemy")
        this.PatrolBoat = new ship.Ship(2, "PatrolBoat", "enemy")

        this.deploy();
    }

    random(n) {
        return Math.floor(Math.random() * n);
    }

    deploy() {
        this.board.randomDeployment(this.Carrier, this.board.enemyBoard)
        this.board.randomDeployment(this.Battleship, this.board.enemyBoard)
        this.board.randomDeployment(this.Destroyer, this.board.enemyBoard)
        this.board.randomDeployment(this.Submarine, this.board.enemyBoard)
        this.board.randomDeployment(this.PatrolBoat, this.board.enemyBoard)
    }

    attack(player) {
        let unassigned = true
        while (unassigned) {
            let lat = this.random(9)
            let lon = this.random(9)
            if (this.board.playerBoard[lat][lon].shotTaken == false) {
                this.fireOnTarget(player, lat, lon)
                unassigned = false;
            }

        }
    }

    fireOnTarget(player, lat, lon) {
        if (this.board.playerBoard[lat][lon].shotTaken === true) {
            console.log("cannot fire on the same cell")
            return false;
        }
        console.log("fired upon lat:" + lat + " lon:" + lon)
        this.board.playerBoard[lat][lon].shotTaken = true;
        if (this.board.playerBoard[lat][lon].hasShip) {
            player[this.board.playerBoard[lat][lon].shipProperties].hit()
        } else {
            console.log("miss")
        }
        let id = lat + "/" + lon;
        document.getElementById(id).style.backgroundColor = "black"
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

export { enemyPlayer }