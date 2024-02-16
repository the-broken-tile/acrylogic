
class NumberButton {
    constructor(private readonly number: number, private selected: boolean) {
    }

    public toString(): string
    {
        return `<button tabindex="-1" class="number-select${this.selected ? ' selected' : ''}" value="${this.number}">${this.number}</button>`
    }
}

export default NumberButton