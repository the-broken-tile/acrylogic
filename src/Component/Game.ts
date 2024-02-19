import Model from '../Models/Game'
import Row from './Row'

class Game {
    constructor (private readonly game: Model) {
    }

    public toString(): string
    {
        return `<div class="game rows-${this.game.getHeight()} cols-${this.game.getWidth()}">
            <div class="horizontal-border"></div>
            ${this.game.getGrid().cells.map(row => new Row(row, this.game)).join('')}
        </div>`
    }
}

export default Game