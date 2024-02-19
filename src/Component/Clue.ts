import Model from '../Models/Clue'
import { ColorNames } from '../Models/Color';

enum TYPE{
    horizontal,
    vertical
}
class Clue {
    public static readonly TYPE = TYPE

    constructor(private readonly clue: Model | undefined, private readonly type: TYPE) {
    }

    public toString(): string
    {
        return this.type === TYPE.horizontal ? this.renderHorizontalClue() : this.renderVerticalClue()

    }
    private renderHorizontalClue(): string
    {
        return `
            <div class="horizontal-border${this.renderClueClassName()}">
                ${this.renderClueValue()}
            </div>
            <div></div>`
    }

    private renderVerticalClue(): string
    {
        return `<div class="vertical-border${this.renderClueClassName()}">
            ${this.renderClueValue()}
        </div>`
    }

    private renderClueValue(): string
    {
        if (this.clue === undefined) {
            return ''
        }

        const text = this.clue.color !== undefined ? ColorNames[this.clue.color] : `${this.clue.number}`;

        return `<span class="clue${this.clue.not === true ? ' not' : ''}">${text}</span>`
    }


    private renderClueClassName(): string
    {
        if (this.clue === undefined || this.clue.color === undefined) {
            return ''
        }
        return ` color-${this.clue.color}`
    }
}

export default Clue