import Game from '../Models/Game'
import Cell from '../Models/Cell'
import { ColorNames } from '../Models/Color'
import Direction from '../Models/Direction'
import Clue from '../Models/Clue'

class Renderer {
    render(root: HTMLDivElement, game: Game): void {
        const parent = root.parentElement as HTMLElement;
        parent.removeChild(root);

        root.innerHTML = `<div class="game rows-${game.getHeight()} cols-${game.getWidth()}">
            <div class="horizontal-border"></div>
            ${game.getGrid().cells.map(row => this.renderRow(row, game), this).join('')}
        </div>`

        parent.appendChild(root);
    }

    private renderRow(row: Array<Cell>, game: Game): string
    {
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

    private renderCell(cell: Cell, game: Game): string
    {
        const clue: Clue | undefined = game.getClue(cell.coordinate, Direction.Right)

        return `
            <div class="cell${this.renderCellClassName(cell)}"
                data-x="${cell.coordinate.x}"
                data-y="${cell.coordinate.y}"
            >
                ${this.renderCellValue(cell)}
                <div class="candidates">${this.renderCandidates(cell)}</div>
            </div>
            <div class="vertical-border${this.renderClueClassName(clue)}">
                ${this.renderClueValue(clue)}
            </div>
        `
    }

    private renderCellValue(cell: Cell): string
    {
        const number = cell.getNumberGuess()

        return number !== undefined
            ? `${number}`
            : ''
    }

    private renderCellClassName(cell: Cell): string
    {
        const color = cell.getColorGuess()

        return color === undefined ? '' : ` color-${color}`
    }

    private renderClueValue(clue: Clue| undefined): string
    {
        if (clue === undefined) {
            return ''
        }

        const text = clue.color !== undefined ? ColorNames[clue.color] : `${clue.number}`;

        return `<span class="clue${clue.not === true ? ' not' : ''}">${text}</span>`
    }

    private renderClueClassName(clue: Clue | undefined): string
    {
        if (clue === undefined || clue.color === undefined) {
            return ''
        }
        return ` color-${clue.color}`
    }

    private renderHorizontalClues(row: Array<Cell>, game: Game): string
    {
        return `<div></div>${row.map(cell => this.renderHorizontalClue(cell, game)).join('')}`
    }

    private renderHorizontalClue(cell: Cell, game: Game): string
    {
        const clue: Clue | undefined = game.getClue(cell.coordinate, Direction.Down)

        return `
            <div class="horizontal-border${this.renderClueClassName(clue)}">
                ${this.renderClueValue(clue)}
            </div>
            <div></div>`
    }

    private renderCandidates(cell: Cell): string
    {
        return `
            <ul>${cell.getColorCandidates().map(color => `<li class="color-${color} color-candidate">&nbsp;</li>`).join('')}</ul>
            <ul>${cell.getNumberCandidates().map(number => `<li>${number}</li>`).join('')}</ul>
        `
    }
}

export default Renderer