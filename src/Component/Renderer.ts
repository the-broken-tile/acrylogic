import Game from '../Models/Game'
import Cell from '../Models/Cell'
import { ColorNames } from '../Models/Color'
import Direction from '../Models/Direction'
import Clue from '../Models/Clue'

class Renderer {
    render(root: HTMLDivElement, game: Game): void {
        root.innerHTML = `<div class="game ${game.height}-rows ${game.width}-cols">
            <div class="horizontal-border"></div>
            ${game.grid.cells.map(row => this.renderRow(row, game), this).join('')}
        </div>`
    }

    private renderRow(row: Array<Cell>, game: Game): string {
        return `
            <div class="row">
                <div class="vertical-border"></div>
                ${row.map(cell => this.renderCell(cell, game), this).join('')}
            </div>
            <div class="row">
                ${this.renderHorizontalClues(row, game)}
            </div>
        `
    }

    private renderCell(cell: Cell, game: Game): string {
        const clue: Clue | undefined = game.getClue(cell.coordinate, Direction.Right)

        return `
            <div class="cell${this.renderCellClassName(cell, game)}"
            data-x="${cell.coordinate.x}"
            data-y="${cell.coordinate.y}"
            >
                ${this.renderCellValue(cell, game)}
            </div>
            <div class="vertical-border${this.renderClueClassName(clue)}">
                ${this.renderClueValue(clue)}
            </div>
        `
    }

    private renderCellValue(cell: Cell, game: Game): string {
        const guess = game.getGuess(cell.coordinate)
        if (guess !== undefined && guess.number !== undefined) {
            return `${guess.number}`
        }

        return ''
    }

    private renderCellClassName(cell: Cell, game: Game): string {
        const guess = game.getGuess(cell.coordinate)
        if (guess !== undefined) {
            return ` color-${guess.color}`
        }

        return ''
    }

    private renderClueValue(clue: Clue| undefined): string {
        if (clue === undefined) {
            return ''
        }

        const text = clue.color !== undefined ? ColorNames[clue.color] : `${clue.number}`;

        return `<span class="clue${clue.not === true ? ' not' : ''}">${text}</span>`
    }

    private renderClueClassName(clue: Clue | undefined): string {
        if (clue === undefined || clue.color === undefined) {
            return ''
        }
        return ` color-${clue.color}`
    }

    private renderHorizontalClues(row: Array<Cell>, game: Game): string {
        return `<div></div>${row.map(cell => this.renderHorizontalClue(cell, game)).join('')}`
    }

    private renderHorizontalClue(cell: Cell, game: Game): string {
        const clue: Clue | undefined = game.getClue(cell.coordinate, Direction.Down)

        return `
            <div class="horizontal-border${this.renderClueClassName(clue)}">
                ${this.renderClueValue(clue)}
            </div>
            <div></div>`
    }
}

export default Renderer