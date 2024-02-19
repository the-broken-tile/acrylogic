import Model from '../Models/Game'
import Row from './Row'

class Game {
    constructor (private readonly game: Model) {
    }

    public toString(): string
    {
        return `<div class="game rows-${this.game.getHeight()} cols-${this.game.getWidth()}">
            ${this.renderFirstRow()}
            ${this.game.getGrid().cells.map(row => new Row(row, this.game)).join('')}
        </div>`
    }

    private renderFirstRow(): string
    {
        let result = '<div class="row"><div></div>'

        for (let i = 0; i < this.game.getWidth(); i++) {
            result += `<div class="horizontal-border color"></div><div></div>`
        }

        return result + '</div>'
    }
}

export default Game