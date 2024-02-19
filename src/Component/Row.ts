import Cell from '../Models/Cell'
import Game from '../Models/Game'
import Direction from '../Models/Direction'
import CellView from './Cell'
import ClueView from './Clue'

class Row {
    constructor(private readonly cells: Array<Cell>, private readonly game: Game) {}

    public toString(): string
    {
        return `
            <div class="row">
                <div class="color vertical-border"></div>
                ${
                    this.cells
                        .map(cell => `
                            ${new CellView(cell)}
                            ${new ClueView(this.game.getClue(cell.coordinate, Direction.Right), ClueView.TYPE.vertical)}
                        `)
                        .join('')
                }
            </div>
            <div class="row">
                <div></div>
                ${this.cells.map(cell => new ClueView(this.game.getClue(cell.coordinate, Direction.Down), ClueView.TYPE.horizontal)).join('')}
            </div>
        `
    }
}

export default Row