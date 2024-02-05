import Color  from './Color'
import Coordinate from './Coordinate'
import Direction from './Direction'

class Clue {
    constructor(
        public readonly coordinate: Coordinate,
        public readonly direction: Direction,
        public readonly color?: Color,
        public readonly number?: number,
        public readonly not?: boolean,
    ) {
    }
}

export default Clue