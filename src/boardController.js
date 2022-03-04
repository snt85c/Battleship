import { Ship } from "./Ship";

class Cell {
    constructor() {
        this.shotTaken = false
        this.hasShip = false;
    }
}

class boardController {

    constructor() {
        this.playerBoard = []
        this.enemyBoard = []
        this.initialize()
    }

    initialize() {
        for (let i = 0; i < 10; i++) {
            this.playerBoard[i] = []
            this.enemyBoard[i] = []
            for (let j = 0; j < 10; j++) {
                this.playerBoard[i][j] = new Cell()
                this.enemyBoard[i][j] = new Cell()
            }
        }
    }

    checkShipPositioning(ship, axis, lat, lon, board) {
        switch (axis) {
            case "x":
                if (ship.getLength() + lon > 10) {

                    return false;
                }
                for (let i = 0; i < ship.getLength(); i++) {
                    if (board[lat][lon + i].hasShip) {
                        return false

                    }
                }
                return true;

            case "y":
                if (ship.getLength() + lat > 10) {
                    return false;
                }
                for (let i = 0; i < ship.getLength(); i++) {
                    if (board[lat + i][lon].hasShip) {
                        return false
                    }
                }
                return true;
        }
    }

    deployShip(ship, axis, lat, lon, board) {
        if (this.checkShipPositioning(ship, axis, lat, lon, board)) {
            for (let i = 0; i < ship.getLength(); i++) {
                if (axis == "x") {
                    board[lat][lon + i].hasShip = true;
                    board[lat][lon + i].shipProperties = ship.getClass();

                }
                if (axis == "y") {
                    board[lat + i][lon].hasShip = true;
                    board[lat + i][lon].shipProperties = ship.getClass();
                }
            }
            return true
        }
        return false
    }

    random(n) {
        return Math.floor(Math.random() * n);
    }

    randomAXIS() {
        const AXIS = ["x", "y"]
        return AXIS[this.random(2)]
    }

    randomDeployment(ship, board) {
        let unassigned = true;
        while (unassigned) {
            if (this.deployShip(ship, this.randomAXIS(), this.random(9), this.random(9), board)) {
                unassigned = false;
            }
        }

    }
}

export { boardController }