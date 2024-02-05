import Coordinate from './Coordinate'
import GenericGuess from './GenericGuess'

class Guess extends GenericGuess {
    private readonly _coordinate: Coordinate

    constructor(coordinate: Coordinate) {
        super(undefined, undefined);
        this._coordinate = coordinate
    }

    get coordinate(): Coordinate {
        return this._coordinate
    }
}

export default Guess