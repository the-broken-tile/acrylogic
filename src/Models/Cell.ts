import Color from './Color'
import Coordinate from './Coordinate'

const MIN_NUMBER = 1;
const MAX_NUMBER = 5;

class Cell {
    public readonly color: Color
    public readonly number: number
    public readonly coordinate: Coordinate
    // private isCompleted: boolean = false
    private numberCandidates: Array<number> = []
    private colorCandidates: Array<Color> = []
    private colorGuess: Color | undefined = undefined
    private numberGuess: number | undefined = undefined

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

    public isComplete(): boolean {
        return this.number === this.numberGuess && this.color === this.colorGuess
    }

    public getColorGuess(): Color | undefined {
        return this.colorGuess
    }

    public getNumberGuess(): number | undefined {
        return this.numberGuess
    }

    public setColorGuess(color: Color | undefined): void {
        this.colorGuess = color
        this.colorCandidates = []
    }

    public setNumberGuess(number: number | undefined): void {
        this.numberGuess = number
        this.numberCandidates = []
    }

    public getColorCandidates(): Array<Color> {
        return this.colorCandidates
    }

    public addColorCandidate(color: Color): void {
        if (!this.colorCandidates.includes(color)) {
            this.colorCandidates.push(color)
        }
    }

    public resetColorCandidates(): void {
        this.colorCandidates = []
    }

    public getNumberCandidates(): Array<number> {
        return this.numberCandidates
    }

    public addNumberCandidate(number: number): void {
        if (!this.numberCandidates.includes(number)) {
            this.numberCandidates.push(number)
        }
    }

    public resetNumberCandidates(): void {
        this.numberCandidates = []
    }

    public toString(): string {
        return `${this.color}/${this.number} ${this.coordinate.toString()}`
    }
}

export { MIN_NUMBER, MAX_NUMBER }
export default Cell

