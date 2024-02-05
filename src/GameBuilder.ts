import Game from './Models/Game'
import Cell from './Models/Cell'
import Grid from './Models/Grid'
import Clue from './Models/Clue'
import Coordinate from './Models/Coordinate'
import Color from './Models/Color';
import Direction from './Models/Direction';

type CellDef = {
    color: Color,
    number: number,
}
type ClueDef = {
    x: number,
    y: number,
    direction: Direction,
    color?: Color,
    number?: number,
    not?: boolean,
}
type GameDef = {
    grid: Array<Array<CellDef>>,
    clues: Array<ClueDef>
}
class GameBuilder
{
    public build(gameDef: GameDef): Game {
        return new Game(this.buildGrid(gameDef.grid), this.buildClues(gameDef.clues))
    }

    private buildGrid = (gridDef: Array<Array<CellDef>>): Grid =>
        new Grid(gridDef.map((row, y) => this.mapRow(row, y)));

    private mapRow = (row: Array<CellDef>, y: number): Array<Cell> =>
        row.map((cell, x) => this.mapCell(cell, y, x));

    private mapCell = (cell: CellDef, y: number, x: number): Cell =>
        new Cell(cell.color, cell.number, new Coordinate(x, y));

    private buildClues = (clues: Array<ClueDef>): Array<Clue> =>
        clues.map(clue => this.buildClue(clue));

    private buildClue = (clue: ClueDef): Clue =>
        new Clue(new Coordinate(clue.x, clue.y), clue.direction, clue.color, clue.number);
}

export default GameBuilder
export type { GameDef, CellDef, ClueDef }