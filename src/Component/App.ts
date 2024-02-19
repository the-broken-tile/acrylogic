import Cell from '../Models/Cell'
import Coordinate from '../Models/Coordinate'
import Game from '../Models/Game'
import Color from '../Models/Color';
import CellState from '../Models/CellState';
import GameEvent from '../Models/GameEvent';

import Menu from './Menu'
import UrlState from '../UrlState';
import Dialog from './Dialog'
import GameView from './Game'
import Input from './Input';

import request from '../request'

import GameBuilder from '../GameBuilder'
import type { GameDef } from '../GameBuilder'
import LevelManager from '../LevelManager';
import GameHistory from '../GameHistory';

class App {
    private game: Game | undefined
    private readonly gameElement: HTMLDivElement;
    private dialog: Dialog
    private menu: Menu
    private currentCell: Cell | undefined
    private enteringCandidates: boolean = false
    private readonly gameBuilder: GameBuilder;
    private readonly urlState: UrlState;
    private gameView: GameView | undefined

    constructor(
        private readonly root: HTMLDivElement,
        private readonly levelManager: LevelManager,
        private readonly gameHistory: GameHistory,
    ) {
        this.gameBuilder = new GameBuilder()
        this.urlState = new UrlState(this.handleHashChange.bind(this))

        this.gameElement = this.root.querySelector('#game') as HTMLDivElement;
        this.dialog = new Dialog(
            this.root,
            this.root.querySelector('#dialog') as HTMLDialogElement,
            this.handleDialogOk.bind(this),
        )

        this.menu = new Menu(
            this.root.querySelector('#menu') as HTMLMenuElement,
            this.handleLevelChange.bind(this),
            this.levelManager,
        )

        this.registerListeners()
    }

    private registerListeners(): void
    {
        this.root.addEventListener('click', this.handleCellClick.bind(this))
        this.gameHistory.registerUndo(this.handleUndo.bind(this))
        this.root.querySelector('#undo')?.addEventListener('click', () => this.gameHistory.undo())
        this.root.querySelector('#redo')?.addEventListener('click', () => this.gameHistory.redo())
    }

    private handleCellClick(event: Event): void
    {
        if (this.dialog.isOpen() || this.game === undefined) {
            return
        }

        const target : HTMLElement | null = event.target as HTMLElement | null
        if (target === null) {
            return
        }

        const cell = this.closest(target, '.cell')

        if (cell === null) {
            return
        }

        const xStr : string = cell.dataset.x as string
        const yStr : string = cell.dataset.y as string

        const coordinate = new Coordinate(parseInt(xStr, 10), parseInt(yStr, 10))

        this.currentCell = this.game.getCell(coordinate)
        this.enteringCandidates = this.closest(target, '.candidates') !== null

        this.dialog.open(
            this.enteringCandidates
                ? this.currentCell.getColorCandidates()
                : [this.currentCell.getColorGuess()].filter(c => c !== undefined) as Array<Color>,
            this.enteringCandidates
                ? this.currentCell.getNumberCandidates()
                : [this.currentCell.getNumberGuess()].filter(n => n !== undefined) as Array<number>,
            this.game.getColors(),
            this.game.getNumbers(),
            this.enteringCandidates ? Dialog.Type.Multiple : Dialog.Type.Single,
        )
    }

    private async handleLevelChange(level: string): Promise<void>
    {
        await this.newGame(level).catch(() => {
            alert(`No such level: ${level}`)
        })

        this.menu.close()
    }

    private handleDialogOk(inputs: Array<Input>): void
    {
        if (this.currentCell === undefined) {
            throw new Error('currentCell is undefined')
        }

        if (this.game === undefined) {
            throw new Error('game is undefined')
        }

        const currentCell = this.currentCell
        this.currentCell = undefined

        const previousState = currentCell.getState()

        if (this.enteringCandidates) {
            currentCell.resetColorCandidates()
            currentCell.resetNumberCandidates()

            inputs.forEach((input: Input): void => {
                if (input.type === Input.Type.color) {
                    const color = input.value as Color
                    currentCell.addColorCandidate(color)

                    return
                }

                const number = input.value as number
                currentCell.addNumberCandidate(number)
            })

            this.gameHistory.addEvent(new GameEvent(previousState, currentCell.getState()))
            this.update()

            return
        }

        currentCell.setNumberGuess(undefined)
        currentCell.setColorGuess(undefined)

        inputs.forEach((input: Input): void => {
            if (input.type === Input.Type.number) {
                const number = input.value as number
                currentCell.setNumberGuess(number)

                return
            }

            const color = input.value as Color
            currentCell.setColorGuess(color)
        })

        this.gameHistory.addEvent(new GameEvent(previousState, currentCell.getState()))

        this.update()
        this.winCheck()
    }

    public async init(): Promise<void>
    {
        const ID = this.levelManager.current()
        await this.newGame(ID);
    }

    public async newGame(level: string, silent: boolean = false): Promise<void>
    {
        const response = await request<GameDef>(`./api/game/${level}.json`)

        this.game = this.gameBuilder.build(response)
        this.gameView = new GameView(this.game)
        if (!silent) {
            this.urlState.setLevel(level)
        }
        this.levelManager.setLevel(level)

        this.update()
    }

    private winCheck(): void
    {
        if (this.game?.isComplete()) {
            // Delay a little to render the grid behind it.
            setTimeout(() => alert('Victory!'), 0)
        }
    }

    private closest(element: HTMLElement, selector: string): HTMLElement | null
    {
        if (element.matches(selector)) {
            return element
        }

        if (element.parentElement === null) {
            return null
        }

        return this.closest(element.parentElement, selector)
    }

    private handleHashChange(level: string): void
    {
        this.newGame(level, true).catch(() => {
            alert(`No such level: ${level}`)
        })
    }

    private handleUndo(state: CellState): void
    {
        if (this.game === undefined || this.game.isComplete()) {
            return
        }
        const cell = this.game.getCell(state.coordinate)
        cell.setState(state)

        this.update()
    }

    private update(): void
    {
        if (this.game === undefined) {
            return
        }
        this.root.querySelector('#undo')?.classList.toggle('disabled', !this.gameHistory.hasUndo())
        this.root.querySelector('#redo')?.classList.toggle('disabled', !this.gameHistory.hasRedo())

        const parent = this.gameElement.parentElement as HTMLElement;

        parent.removeChild(this.gameElement);
        this.gameElement.innerHTML = `${this.gameView}`
        parent.appendChild(this.gameElement);
    }
}

export default App