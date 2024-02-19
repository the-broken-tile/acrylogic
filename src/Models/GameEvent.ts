import CellState from './CellState';

class GameEvent {
    constructor(
        public readonly before: CellState,
        public readonly after: CellState,
    ) {}
}

export default GameEvent