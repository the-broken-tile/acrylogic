import Color, { ColorNames } from '../Models/Color'
import Guess from '../Models/Guess'
import ColorButton from './ColorButton'
import NumberButton from './NumberButton'
import Input from "./Input";

enum Type {
    Single,
    Multiple,
}
type ColorShortCutsMap = Record<string, Color>
const COLOR_SHORTCUTS: ColorShortCutsMap = {
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

type ColorMap = Record<string, Color>

const COLOR_MAP: ColorMap = {
    [Color.White.toString()]: Color.White,
    [Color.Black.toString()]: Color.Black,
    [Color.Blue.toString()]: Color.Blue,
    [Color.Red.toString()]: Color.Red,
    [Color.Yellow.toString()]: Color.Yellow,
}

class Dialog {
    public static Type = Type

    private readonly ok: HTMLButtonElement
    private readonly cancel: HTMLButtonElement
    private readonly colorSelect: HTMLDivElement
    private readonly numberSelect: HTMLDivElement
    private availableColors: Array<Color> = []
    private availableNumbers: Array<number> = []
    private selectedColors: Array<Color> = []
    private selectedNumbers: Array<number> = []
    private type: Type = Type.Single;

    constructor(
        private root: HTMLElement,
        private readonly el: HTMLDialogElement,
        private readonly onOk: Function
    ) {
        this.el.innerHTML = this.render()

        this.ok = this.el.querySelector('#dialog-ok') as HTMLButtonElement;
        this.cancel = this.el.querySelector('#dialog-cancel') as HTMLButtonElement
        this.colorSelect = this.el.querySelector('#color-select') as HTMLDivElement
        this.numberSelect = this.el.querySelector('#number-select') as HTMLDivElement

        this.registerEvents();
    }

    private handleOk(): void {
        this.el.close()
        this.onOk(this.getSelection())
    }

    private getSelection(): Array<Input> {
        return [
            ...this.getSelectedColors().map(color => new Input(Input.Type.color, color)),
            ...this.getSelectedNumbers().map(number => new Input(Input.Type.number, number))
        ]
    }

    private update(): void {
        this.colorSelect.innerHTML = this.renderColorOptions()
        this.numberSelect.innerHTML = this.renderNumberOptions()
    }

    public open(
        selectedColors: Array<Color>,
        selectedNumbers: Array<number>,
        colors: Array<Color>,
        numbers: Array<number>,
        type: Type
    ): void {
        this.resetForm()
        this.type = type
        this.availableColors = colors
        this.selectedColors = selectedColors
        this.selectedNumbers = selectedNumbers
        this.availableNumbers = numbers

        this.update()
        this.el.showModal()
    }

    public close(): void {
        this.el.close()
    }

    private handleCancel(): void {
        this.close()
    }

    private render = (): string => `
        <div id="color-select"></div><div>
        <div id="number-select"></div>
        <div>
            <button id="dialog-ok">Ok</button>
            <button id="dialog-cancel">Cancel</button>
        </div>`

    public isOpen(): boolean {
        return this.el.open
    }

    private getSelectedColors(): Array<Color> {
        return this.selectedColors
    }

    private getSelectedNumbers(): Array<number> {
        return this.selectedNumbers
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
            this.selectedNumbers = []
            this.selectedColors = []
            this.update()
            event.preventDefault()

            return
        }

        if (COLOR_SHORTCUTS.hasOwnProperty(keyPressed)) {
            event.preventDefault()
            const color = COLOR_SHORTCUTS[keyPressed]
            if (this.selectedColors.includes(color)) {
                this.selectedColors = this.selectedColors.filter(c => c !== color)
                this.update()

                return
            }

            this.selectedColors.push(color)
            this.update()

            return
        }

        if (NUMBER_MAP.hasOwnProperty(keyPressed)) {
            event.preventDefault()
            const number = NUMBER_MAP[keyPressed]
            if (this.selectedNumbers.includes(number)) {
                this.selectedNumbers = this.selectedNumbers.filter(n => n !== number)
                this.update()

                return
            }
            this.selectedNumbers.push(number)
            this.update()

            return
        }
    }

    private resetForm(): void {
        this.selectedColors = []
        this.selectedNumbers = []
        this.colorSelect.innerHTML = ''
    }

    private registerEvents(): void {
        this.ok.addEventListener('click', this.handleOk.bind(this))
        this.cancel.addEventListener('click', this.handleCancel.bind(this))
        this.root.addEventListener('keyup', this.handleKeyboardEvent.bind(this))
        this.el.addEventListener('click', this.handleClick.bind(this))
    }

    private handleClick(event: Event): void {
        const target = event.target as HTMLElement | HTMLButtonElement
        if (target instanceof HTMLButtonElement) {
            const value = target.value as string
            if (target.classList.contains('color-select')) {
                const color = COLOR_MAP[value]
                if (this.selectedColors.includes(color)) {
                    this.selectedColors = this.selectedColors.filter(c => c !== color)
                } else {
                    this.selectedColors.push(color)
                }

                this.update()

                return
            }

            const number = parseInt(value, 10)
            if (this.selectedNumbers.includes(number)) {
                this.selectedNumbers = this.selectedNumbers.filter(n => n !== number)
            } else {
                this.selectedNumbers.push(number)
            }
            this.update()
        }
    }

    private renderColorOptions = (): string => this.availableColors
        .map((color: Color): string => new ColorButton(color, this.selectedColors.includes(color)).toString())
        .join('')

    private renderNumberOptions = (): string => this.availableNumbers
        .map((number: number): string => new NumberButton(number, this.selectedNumbers.includes(number)).toString())
        .join('')
    
}

export default Dialog