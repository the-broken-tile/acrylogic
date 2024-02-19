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
            <div class="horizontal-border color ${this.renderClueClassName()}">
                ${this.renderClueValue()}
            </div>
            <div></div>`
    }

    private renderVerticalClue(): string
    {
        return `<div class="vertical-border color ${this.renderClueClassName()}">
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
        let classNames: Array<string> = [];
        if (this.clue === undefined) {
            return ''
        }

        if (this.clue.color !== undefined) {
            classNames.push(`color-${this.clue.color}`)
        }

        if (this.clue.number !== undefined) {
            classNames.push(`number-${this.clue.number}`)
            classNames.push('number-clue')
        }

        return classNames.join(' ')
    }
}

export default Clue