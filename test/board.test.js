import { gameController } from "../src/gameController";
import { Ship } from "../src/Ship";

const Board = new gameController();
const carrier = new Ship(5, "Carrier")
const battleship = new Ship(4, "Battleship")
const destroyer = new Ship(3, "Destroyer")
const submarine = new Ship(3, "Submarine")
const patrolBoat = new Ship(2, "Patrol Boat")

Board.deployShip(carrier, "x", 0, 1)
Board.deployShip(battleship, "y", 6, 0)
Board.deployShip(destroyer, "x", 5, 1)
Board.deployShip(submarine, "y", 3, 8)
Board.deployShip(patrolBoat, "x", 9, 8)

test("test drive", () => {
    expect(1).toBe(1)
})

test("check the ship", () => {
    expect(carrier.getLength()).toBe(5)
    expect(carrier.getClass()).toBe("Carrier")
    expect(carrier.isSunk()).toBe(false);
})

test("check the board", () => {
    expect(Board.board[0][0].shotTaken).toBe(false)
    expect(Board.board[0][0].hasShip).toBe(false)
        // expect(Board.board[0][1].hasShip).toBe(true)

})

test("check positioning", () => {
    expect(Board.checkShipPositioning(carrier, "x", 0, 1)).toBe(true)
    expect(Board.checkShipPositioning(battleship, "y", 6.0)).toBe(true)
    expect(Board.checkShipPositioning(destroyer, "x", 5, 1)).toBe(true)
    expect(Board.checkShipPositioning(submarine, "y", 3, 8)).toBe(true)
    expect(Board.checkShipPositioning(patrolBoat, "x", 9, 8)).toBe(true)
})