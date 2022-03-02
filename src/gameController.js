import { Ship } from "./Ship";

class Cell {
    constructor() {
        this.shotTaken = false
        this.hasShip = false;
    }
}

class gameController {

    constructor() {
        this.board = []
        this.initialize()
    }

    initialize() {
        for (let i = 0; i < 10; i++) {
            this.board[i] = []
            for (let j = 0; j < 10; j++) {
                this.board[i][j] = new Cell()
            }
        }
    }

    checkShipPositioning(ship, axis, lat, lon) {
        switch (axis) {
            case "x":
                /**horizontal positioning */
                if (ship.getLength() + lon > 10) {
                    return false;
                }
                // if (ship.getLength() + lon <= 9) {
                for (let i = 0; i < ship.getLength(); i++) {
                    if (this.board[lat][lon + i].hasShip) {
                        return false
                    }
                    // }
                }
                return true;

            case "y":
                /*vertical positioning */
                if (ship.getLength() + lat > 10) {
                    return false;
                }
                // if (ship.getLength() + lat <= 9) {
                for (let i = 0; i < ship.getLength(); i++) {
                    if (this.board[lat + i][lon].hasShip) {
                        return false
                    }
                }
                // }
                return true;
        }
    }

    deployShip(ship, axis, lat, lon) {
        if (this.checkShipPositioning(ship, axis, lat, lon)) {
            for (let i = 0; i < ship.getLength(); i++) {
                if (axis == "x") {
                    this.board[lat][lon + i].hasShip = true;
                }
                if (axis == "y") {
                    this.board[lat + i][lon].hasShip = true;
                }
            }
        }
    }
}



export { gameController }