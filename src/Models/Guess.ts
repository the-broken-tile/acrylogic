import Coordinate from './Coordinate'
import GenericGuess from './GenericGuess'

class Guess extends GenericGuess {

    constructor(public readonly coordinate: Coordinate) {
        super(undefined, undefined);
    }
}

export default Guess