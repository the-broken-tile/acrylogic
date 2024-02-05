import Game from '../Models/Game'
import Cell from '../Models/Cell'
import { ColorNames } from '../Models/Color'
import Direction from '../Models/Direction'
import Clue from '../Models/Clue'

class Renderer {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    render(): string {
        return `<div class="game ${this.game.height}-rows ${this.game.width}-cols">
            <div class="horizontal-border"></div>
            ${this.game.grid.cells.map(row => this.renderRow(row), this).join('')}
        </div>`
    }

    private renderRow(row: Array<Cell>): string {
        return `
            <div class="row">
                <div class="vertical-border"></div>
                ${row.map(cell => this.renderCell(cell), this).join('')}
            </div>
            <div class="row">
                ${this.renderHorizontalClues(row)}
            </div>
        `
    }

    private renderCell(cell: Cell): string {
        const clue: Clue | undefined = this.game.getClue(cell.coordinate, Direction.Right)

        return `
            <div class="cell${this.renderCellClassName(cell)}"
            data-x="${cell.coordinate.x}"
            data-y="${cell.coordinate.y}"
            >
                ${this.renderCellValue(cell)}
            </div>
            <div class="vertical-border${this.renderClueClassName(clue)}">
                ${this.renderClueValue(clue)}
            </div>
        `
    }

    private renderCellValue(cell: Cell): string {
        const guess = this.game.getGuess(cell.coordinate)
        if (guess !== undefined && guess.number !== undefined) {
            return `${guess.number}`
        }

        return ''
    }

    private renderCellClassName(cell: Cell): string {
        const guess = this.game.getGuess(cell.coordinate)
        if (guess !== undefined) {
            return ` color-${guess.color}`
        }

        return ''
    }

    private renderClueValue(clue: Clue| undefined): string {
        if (clue === undefined) {
            return ''
        }

        if (clue.color !== undefined) {
            return `<span class="clue">${ColorNames[clue.color]}</span>`
        }

        return `<span class="clue">${clue.number}</span>`
    }

    private renderClueClassName(clue: Clue | undefined): string {
        if (clue === undefined || clue.color === undefined) {
            return ''
        }
        return ` color-${clue.color}`
    }

    private renderHorizontalClues(row: Array<Cell>): string {
        return `<div></div>${row.map(cell => this.renderHorizontalClue(cell)).join('')}`
    }

    private renderHorizontalClue(cell: Cell): string {
        const clue: Clue | undefined = this.game.getClue(cell.coordinate, Direction.Down)

        return `
            <div class="horizontal-border${this.renderClueClassName(clue)}">
                <span class="clue">${this.renderClueValue(clue)}</span>
            </div>
            <div></div>`
    }
}

export default Renderer