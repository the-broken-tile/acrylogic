enum Color {
    White = 0,
    Blue = 1,
    Red = 2,
    Yellow = 4,
    Purple = Color.Blue + Color.Red,
    Orange = Color.Red + Color.Yellow,
    Green = Color.Blue + Color.Yellow,
    Black = Infinity,
}

export const ColorNames = {
    [Color.White]: 'White',
    [Color.Blue]: 'Blue',
    [Color.Red]: 'Red',
    [Color.Yellow]: 'Yellow',
    [Color.Purple]: 'Purple',
    [Color.Orange]: 'Orange',
    [Color.Green]: 'Green',
    [Color.Black]: 'Black',
}

export default Color