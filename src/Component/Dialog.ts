import Guess from '../Models/Guess'
import Color, { ColorNames } from '../Models/Color'
import { MIN_NUMBER, MAX_NUMBER } from '../Models/Cell'
import GenericGuess from '../Models/GenericGuess'

type ColorShortCutsMp = Record<string, Color>
const COLOR_SHORTCUTS: ColorShortCutsMp = {
    w: Color.White,
    u: Color.Blue,
    b: Color.Black,
    r: Color.Red,
    g: Color.Green,
    y: Color.Yellow,
    p: Color.Purple,
    o: Color.Orange,
}

type NumberMap = Record<string, number>
const NUMBER_MAP: NumberMap = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
}

class Dialog {
    private readonly el: HTMLDialogElement
    private readonly ok: HTMLButtonElement
    private readonly cancel: HTMLButtonElement
    private readonly colorSelect: HTMLSelectElement;
    private readonly numberInput: HTMLInputElement;
    private onOk: Function = (guess: GenericGuess) => {}
    private currentGuess: GenericGuess|undefined

    constructor(private document: Document) {
        this.el = document.createElement('dialog')
        document.body.appendChild(this.el)
        this.el.innerHTML = this.render()

        this.ok = document.getElementById('dialog-ok') as HTMLButtonElement
        this.ok.addEventListener('click', this.handleOk.bind(this))
        this.cancel = document.getElementById('dialog-cancel') as HTMLButtonElement
        this.cancel.addEventListener('click', this.handleCancel.bind(this))
        this.colorSelect = document.getElementById('color-select') as HTMLSelectElement
        this.numberInput = document.getElementById('number-input') as HTMLInputElement
        document.body.addEventListener('keyup', this.handleKeyboardEvent.bind(this))
        // document.addEventListener('click', this.handleCellClick.bind(this))
    }

    private handleOk(): void {
        this.el.close()
        this.onOk(this.createGuess())
    }
    public open(guess: Guess|undefined, callable: (guess: GenericGuess) => void): void {
        this.el.showModal()
        this.onOk = callable;
        this.currentGuess = guess

        this.resetForm()
        if (guess !== undefined) {
            if (guess.number !== undefined) {
                this.numberInput.value = `${guess.number}`
            }
            if (guess.color !== undefined) {
                this.colorSelect.value = `${guess.color}`
            }
        }
    }

    public close(): void {
        this.el.close()
    }

    private handleCancel(): void {
        this.close()
    }

    private render(): string {
        return `<div>
            <select id="color-select" autofocus>
                <option value=""></option>
                ${Object.entries(ColorNames).map(entry => `<option value="${entry[0]}">${entry[1]}</option>`).join('')}
            </select>
        </div>
        <div>
        <input id="number-input" type="number" min="${MIN_NUMBER}" max="${MAX_NUMBER}" step="1">
        </div>
        <div><button id="dialog-ok">Ok</button><button id="dialog-cancel">Cancel</button></div>`
    }

    public isOpen(): boolean {
        return this.el.open
    }

    private createGuess(): GenericGuess {
        return new GenericGuess(this.getSelectedColor(), this.getSelectedNumber())
    }

    private getSelectedColor(): Color|undefined {
        const value = this.colorSelect.value
        if (value === '') {
            return undefined
        }
        if (value === 'Infinity') {
            return Infinity
        }

        return parseInt(value, 10)
    }

    private getSelectedNumber(): number|undefined {
        const value = this.numberInput.value
        if (value === '') {
            return undefined
        }

        return parseInt(value, 10)
    }

    private handleKeyboardEvent(event: KeyboardEvent) {
        const keyPressed = event.key;
        if (keyPressed === 'Escape') {
            event.preventDefault()
            this.close()

            return
        }

        if (keyPressed === 'Enter') {
            this.handleOk()
            event.preventDefault()

            return
        }

        if (keyPressed === 'Backspace') {
            this.resetForm()
            event.preventDefault()

            return
        }

        if (COLOR_SHORTCUTS.hasOwnProperty(keyPressed)) {
            event.preventDefault()
            const color = COLOR_SHORTCUTS[keyPressed]
            this.colorSelect.value = `${color}`

            return
        }

        if (NUMBER_MAP.hasOwnProperty(keyPressed)) {
            event.preventDefault()
            const number = NUMBER_MAP[keyPressed]
            this.numberInput.value = `${number}`

            return
        }

    }

    private resetForm(): void {
        this.colorSelect.selectedIndex = -1
        this.numberInput.value = ''
    }
}

export default Dialog