class Ship {

    constructor(length, ship_class) {
        this.length = length;
        this.ship_class = ship_class
    }

    getLength() {
        return this.length;
    }

    getClass() {
        return this.ship_class;
    }

    hit() {
        if (!this.isSunk()) {
            this.length--
        }
    }

    isSunk() {
        return this.length == 0;
    }
}

export { Ship }