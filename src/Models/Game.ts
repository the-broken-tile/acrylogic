import Grid from './Grid'
import Clue from './Clue'
import Cell from './Cell'
import Coordinate from './Coordinate'
import Direction from './Direction'
import Guess from './Guess'

class Game {
    private readonly _grid: Grid
    private readonly _clues: Array<Clue>
    private guesses: Array<Guess> = []

    constructor(grid: Grid, clues: Array<Clue>) {
        this._grid = grid
        this._clues = clues
    }

    get grid(): Grid {
        return this._grid
    }

    getCell(coordinate: Coordinate): Cell {
        return this._grid.cells[coordinate.y][coordinate.x]
    }

    get clues(): Array<Clue> {
        return this._clues
    }

    get height(): number {
        return this._grid.cells.length
    }

    get width(): number {
        return this._grid.cells[0].length
    }

    getClue(coordinate: Coordinate, direction: Direction): Clue | undefined {
        return this._clues.find(clue => {
            return clue.coordinate.equals(coordinate) && clue.direction === direction
        }) as Clue | undefined
    }

    getGuess(coordinate: Coordinate): Guess | undefined {
        return this.guesses.find(guess => guess.coordinate.equals(coordinate)) as Guess | undefined
    }

    updateGuess(guess: Guess): void {
        const existingGuess = this.getGuess(guess.coordinate)
        if (existingGuess) {
            existingGuess.color = guess.color
            existingGuess.number = guess.number
        } else {
            this.guesses.push(guess)
        }
        const cell = this.getCell(guess.coordinate)
        cell.markCompleted(guess.number === cell.number && guess.color === cell.color)
    }

    isComplete(): boolean {
        return this._grid.cells.every(row => row.every(cell => cell.isComplete()))
    }
}

export default Game