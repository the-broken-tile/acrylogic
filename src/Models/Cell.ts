import Color from './Color'
import Coordinate from './Coordinate'
import CellState from './CellState';

class Cell {
    public readonly color: Color
    public readonly number: number
    public readonly coordinate: Coordinate
    private numberCandidates: Array<number> = []
    private colorCandidates: Array<Color> = []
    private colorGuess: Color | undefined = undefined
    private numberGuess: number | undefined = undefined

    constructor(color: Color, number: number, coordinate: Coordinate)
    {
        this.color = color
        this.number = number
        this.coordinate = coordinate
    }

    public isComplete(): boolean
    {
        return this.number === this.numberGuess && this.color === this.colorGuess
    }

    public getColorGuess(): Color | undefined
    {
        return this.colorGuess
    }

    public getNumberGuess(): number | undefined
    {
        return this.numberGuess
    }

    public setColorGuess(color: Color | undefined): void
    {
        this.colorGuess = color
        if (color !== undefined) {
            this.colorCandidates = []
        }
    }

    public setNumberGuess(number: number | undefined): void
    {
        this.numberGuess = number
        if (number !== undefined) {
            this.numberCandidates = []
        }
    }

    public getColorCandidates(): Array<Color>
    {
        return [...this.colorCandidates]
    }

    public addColorCandidate(color: Color): void
    {
        if (!this.colorCandidates.includes(color)) {
            this.colorCandidates.push(color)
        }
    }

    public resetColorCandidates(): void
    {
        this.colorCandidates = []
    }

    public getNumberCandidates(): Array<number>
    {
        return [...this.numberCandidates]
    }

    public addNumberCandidate(number: number): void
    {
        if (!this.numberCandidates.includes(number)) {
            this.numberCandidates.push(number)
        }
    }

    public resetNumberCandidates(): void
    {
        this.numberCandidates = []
    }

    public getState(): CellState
    {
        return new CellState(this)
    }

    public setState(state: CellState): void
    {
        this.colorCandidates = state.colorCandidates
        this.numberCandidates = state.numberCandidates
        this.colorGuess = state.colorGuess
        this.numberGuess = state.numberGuess
    }

    public toString = (): string => `${this.color}/${this.number} ${this.coordinate.toString()}`;
}

export default Cell

