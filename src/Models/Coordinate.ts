import Direction from './Direction'

class Coordinate {
    constructor(public x: number, public y: number) {
    }

    equals(other: Coordinate): boolean
    {
        return this.x === other.x && this.y === other.y
    }

    next(direction: Direction): Coordinate
    {
        if (direction === Direction.Up) {
            return new Coordinate(this.x, this.y - 1)
        }

        if (direction === Direction.Down) {
            return new Coordinate(this.x, this.y + 1)
        }

        if (direction === Direction.Left) {
            return new Coordinate(this.x - 1, this.y)
        }

        if (direction === Direction.Right) {
            return new Coordinate(this.x + 1, this.y)
        }

        throw new Error('Invalid direction')
    }

    toString = (): string => `(${this.x}, ${this.y})`;
}

export default Coordinate