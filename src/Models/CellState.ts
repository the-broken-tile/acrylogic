import Cell from './Cell';
import Color from './Color';
import Coordinate from './Coordinate';

class CellState {
    public readonly numberCandidates: Array<number>
    public readonly colorCandidates: Array<Color>
    public readonly colorGuess: Color | undefined
    public readonly numberGuess: number | undefined
    public readonly coordinate: Coordinate

    constructor(cell: Cell)
    {
        this.numberCandidates = cell.getNumberCandidates()
        this.colorCandidates = cell.getColorCandidates()
        this.colorGuess = cell.getColorGuess()
        this.numberGuess = cell.getNumberGuess()
        this.coordinate = cell.coordinate
    }
}

export default CellState