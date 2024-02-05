import Cell from '../Models/Cell'
import Coordinate from '../Models/Coordinate'
import Game from '../Models/Game'
import GenericGuess from '../Models/GenericGuess'
import Guess from '../Models/Guess'
import Dialog from './Dialog'

import GameBuilder from '../GameBuilder'
import type { GameDef } from '../GameBuilder'
import request from '../request'
import Renderer from './Renderer'

class App {
    private game: Game|undefined
    private element: HTMLElement
    private dialog: Dialog
    private currentCell: Cell|undefined
    private readonly gameBuilder: GameBuilder;

    constructor(private root: string, private document: Document) {
        this.gameBuilder = new GameBuilder()


        const element = this.document.getElementById(this.root) as HTMLElement | null
        this.dialog = new Dialog(document)

        if (element === null) {
            throw new Error('Could not find root element')
        }

        this.element = element
        document.addEventListener('click', this.handleCellClick.bind(this))
    }

    private handleCellClick(event: Event): void {
        if (this.dialog.isOpen()) {
            return
        }

        const target : HTMLElement | null = event.target as HTMLElement | null

        if (target === null || !target.classList.contains('cell')) {
            return
        }

        const xStr : string |undefined = target.dataset.x
        const yStr : string | undefined = target.dataset.y

        if (xStr === undefined || yStr === undefined) {
            return
        }
        const coordinate = new Coordinate(parseInt(xStr, 10), parseInt(yStr, 10))
        this.currentCell = this.game?.getCell(coordinate)

        this.dialog.open(
            this.game?.getGuess(coordinate),
            this.handleOk.bind(this)
        )
    }

    private handleOk(guess: GenericGuess): void {
        if (this.currentCell === undefined) {
            throw new Error('currentCell is undefined')
        }

        const newGuess = new Guess(this.currentCell.coordinate)
        newGuess.color = guess.color
        newGuess.number = guess.number
        this.game?.updateGuess(newGuess)

        this.currentCell = undefined
        if (this.game === undefined) {
            throw new Error('game is undefined')
        }

        this.element.innerHTML = new Renderer(this.game).render()

        this.winCheck()
    }

    private createGame(gameDef: GameDef): Game {
        return this.gameBuilder.build(gameDef);
    };

    public async newGame(id: number) {
        const response = await request<GameDef>(`./api/game/${id}.json`)

        this.game = this.createGame(response)
        const renderer = new Renderer(this.game)
        this.element.innerHTML = renderer.render()
    }

    private winCheck() {
        if (this.game?.isComplete()) {
            // Delay a little to render the grid behind it.
            setTimeout(() => alert('Victory!'), 0)
        }
    }
}

export default App