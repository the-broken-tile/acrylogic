import Game from './Models/Game'
import Cell from './Models/Cell'
import Grid from './Models/Grid'
import Clue from './Models/Clue'
import Coordinate from './Models/Coordinate'
import Color from './Models/Color';
import Direction from './Models/Direction';

type CellDef = {
    color: string,
    number: number,
}
type ClueDef = {
    x: number,
    y: number,
    direction: string,
    color?: string,
    number?: number,
    not?: boolean,
}
type DirectionMapType = Record<string, Direction>
const DirectionMap: DirectionMapType = {
    up: Direction.Up,
    down: Direction.Down,
    left: Direction.Left,
    right: Direction.Right,
}
type GameDef = {
    width: number,
    height: number,
    colors: Array<string>,
    numbers: Array<number>,
    grid: Array<Array<CellDef>>,
    clues: Array<ClueDef>
}

type ColorMapType = Record<string, Color>
const ColorMap: ColorMapType = {
    white: Color.White,
    blue: Color.Blue,
    red: Color.Red,
    yellow: Color.Yellow,
    purple: Color.Purple,
    orange: Color.Orange,
    green: Color.Green,
    black: Color.Black,
}

class GameBuilder
{
    public build(gameDef: GameDef): Game
    {
        return new Game(
            this.buildGrid(gameDef.grid),
            this.buildClues(gameDef.clues),
            gameDef.numbers,
            gameDef.colors.map(color => ColorMap[color])
        )
    }

    private buildGrid = (gridDef: Array<Array<CellDef>>): Grid =>
        new Grid(gridDef.map((row, y) => this.mapRow(row, y)));

    private mapRow = (row: Array<CellDef>, y: number): Array<Cell> =>
        row.map((cell, x) => this.mapCell(cell, y, x));

    private mapCell = (cell: CellDef, y: number, x: number): Cell =>
        new Cell(ColorMap[cell.color], cell.number, new Coordinate(x, y));

    private buildClues = (clues: Array<ClueDef>): Array<Clue> =>
        clues.map(clue => this.buildClue(clue));

    private buildClue = (clue: ClueDef): Clue =>
        new Clue(new Coordinate(clue.x, clue.y), DirectionMap[clue.direction], clue.color ? ColorMap[clue.color] : undefined, clue.number, clue.not);
}

export default GameBuilder
export type { GameDef, CellDef, ClueDef }