import Grid from './Grid'
import Clue from './Clue'
import Cell from './Cell'
import Coordinate from './Coordinate'
import Direction from './Direction'
import Color from './Color';

class Game {
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

    isComplete(): boolean {
        return this.grid.cells.every(row => row.every(cell => cell.isComplete()))
    }
}

export default Game