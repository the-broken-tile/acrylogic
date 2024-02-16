import Color from '../Models/Color'

enum Type {
    color,
    number,
}

class Input {
    public static Type = Type

    constructor(public readonly type: Type, public readonly value: number | Color) {
    }
}

export default Input