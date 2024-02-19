import Color from '../Models/Color';

class ColorButton {
    constructor(private readonly color: Color, private selected: boolean) {
    }

    public toString(): string
    {
        return `<button tabindex="-1" class="color color-select color-${this.color.toString()}${this.selected ? ' selected' : ''}" value="${this.color.toString()}"></button>`
    }
}

export default ColorButton