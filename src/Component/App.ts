import Cell from '../Models/Cell'
import Coordinate from '../Models/Coordinate'
import Game from '../Models/Game'
import GenericGuess from '../Models/GenericGuess'
import Menu from './Menu'

import Dialog from './Dialog'
import Store from '../Store'
import GameBuilder from '../GameBuilder'
import type { GameDef } from '../GameBuilder'
import request from '../request'
import Renderer from './Renderer'

class App {
    private game: Game | undefined
    private readonly gameElement: HTMLDivElement;
    private dialog: Dialog
    private menu: Menu
    private currentCell: Cell | undefined
    private readonly gameBuilder: GameBuilder;

    constructor(
        private readonly root: HTMLDivElement,
        private store: Store,
        private renderer: Renderer
    ) {
        this.gameBuilder = new GameBuilder()

        this.gameElement = this.root.querySelector('#game') as HTMLDivElement;
        this.dialog = new Dialog(
            this.root,
            this.root.querySelector('#dialog') as HTMLDialogElement,
            this.handleOk.bind(this),
        )

        this.menu = new Menu(
            this.root.querySelector('#menu') as HTMLMenuElement,
            this.store,
            this.handleLevelChange.bind(this),
        )

        this.root.addEventListener('click', this.handleCellClick.bind(this))

    }

    private handleCellClick(event: Event): void {
        if (this.dialog.isOpen() || this.game === undefined) {
            return
        }

        const target : HTMLElement | null = event.target as HTMLElement | null

        if (target === null || !target.classList.contains('cell')) {
            return
        }

        const xStr : string | undefined = target.dataset.x
        const yStr : string | undefined = target.dataset.y

        if (xStr === undefined || yStr === undefined) {
            return
        }
        const coordinate = new Coordinate(parseInt(xStr, 10), parseInt(yStr, 10))
        this.currentCell = this.game?.getCell(coordinate)

        this.dialog.open(
            new GenericGuess(
                this.currentCell?.getColorGuess(),
                this.currentCell?.getNumberGuess(),
            ),
            this.game.getColors(),
            this.game.getNumbers(),
        )
    }

    private async handleLevelChange(level: number): Promise<void>
    {
        await this.newGame(level).catch(() => {
            alert('No such level.')
        })

        this.store.setId(level)
        this.menu.close()
    }

    private handleOk(guess: GenericGuess): void {
        if (this.currentCell === undefined) {
            throw new Error('currentCell is undefined')
        }

        if (this.game === undefined) {
            throw new Error('game is undefined')
        }

        this.currentCell.setColorGuess(guess.color)
        this.currentCell.setNumberGuess(guess.number)
        this.currentCell = undefined

        this.renderer.render(this.gameElement, this.game)

        this.winCheck()
    }

    public async init() {
        const ID = this.store.getId() ?? 1;
        this.store.setId(ID);
        await this.newGame(ID);
    }

    public async newGame(id: number) {
        const response = await request<GameDef>(`./api/game/${id}.json`)

        this.game = this.gameBuilder.build(response)

        this.renderer.render(this.gameElement, this.game)
    }

    private winCheck() {
        if (this.game?.isComplete()) {
            // Delay a little to render the grid behind it.
            setTimeout(() => alert('Victory!'), 0)
        }
    }
}

export default App