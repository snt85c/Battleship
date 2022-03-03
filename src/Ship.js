class Ship {

    constructor(length, ship_class, owner) {
        this.length = length;
        this.ship_class = ship_class
        this.owner = owner;
    }

    getLength() {
        return this.length;
    }

    getOwner() {
        return this.owner;
    }

    getClass() {
        return this.ship_class;
    }

    hit() {
        this.length--
            if (!this.isSunk()) {
                console.log("DIRECT HIT on " + this.getOwner() + " " + this.getClass())
            } else {
                console.log(this.getOwner() + " " + this.getClass() + " is SUNK")
            }
    }

    isSunk() {
        return this.length === 0 ? true : false;
    }
}

export { Ship }