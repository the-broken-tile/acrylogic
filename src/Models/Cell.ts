import Color from './Color'
import Coordinate from './Coordinate'

const MIN_NUMBER = 1;
const MAX_NUMBER = 5;

class Cell {
    public readonly color: Color
    public readonly number: number
    public readonly coordinate: Coordinate
    private isCompleted: boolean = false

    constructor(color: Color, number: number, coordinate: Coordinate) {
        if (number < MIN_NUMBER) {
            throw new Error(`Number must be gte ${MIN_NUMBER}.`)
        }
        if (number >= MAX_NUMBER) {
            throw new Error(`Number must be lte ${MAX_NUMBER}.`)
        }

        this.color = color
        this.number = number
        this.coordinate = coordinate
    }

    markCompleted(completed: boolean): void {
        this.isCompleted = completed
    }

    isComplete(): boolean {
        return this.isCompleted
    }

    toString(): string {
        return `${this.color}/${this.number} ${this.coordinate.toString()}`
    }
}

export { MIN_NUMBER, MAX_NUMBER }
export default Cell

