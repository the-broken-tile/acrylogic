import Grid from './Grid'
import Clue from './Clue'
import Cell from './Cell'
import Coordinate from './Coordinate'
import Direction from './Direction'
import Guess from './Guess'
import Color from './Color';

class Game {
    private guesses: Array<Guess> = []

    constructor(
        private readonly grid: Grid,
        private readonly clues: Array<Clue>,
        private readonly numbers: Array<number>,
        private readonly colors: Array<Color>,
    ) {
    }

    public getGrid(): Grid {
        return this.grid
    }

    public getCell(coordinate: Coordinate): Cell {
        return this.grid.getCell(coordinate)
    }

    public getClues(): Array<Clue> {
        return this.clues
    }

    public getColors(): Array<Color>
    {
        return this.colors
    }

    public getNumbers(): Array<number> {
        return this.numbers
    }

    get height(): number {
        return this.grid.cells.length
    }

    get width(): number {
        return this.grid.cells[0].length
    }

    getClue(coordinate: Coordinate, direction: Direction): Clue | undefined {
        return this.clues.find(clue => {
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
        return this.grid.cells.every(row => row.every(cell => cell.isComplete()))
    }
}

export default Game