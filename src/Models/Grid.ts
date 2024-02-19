import Cell from './Cell'
import Coordinate from './Coordinate';

class Grid {
    private readonly _cells: Array<Array<Cell>>

    constructor(cells: Array<Array<Cell>>)
    {
        this._cells = cells
    }

    get cells(): Array<Array<Cell>>
    {
        return this._cells
    }

    public getCell(coordinate: Coordinate): Cell
    {
        return this._cells[coordinate.y][coordinate.x]
    }


    public validate(): boolean {
        let totalCells = 0

        return true
    }
}

export default Grid
