import { Direction } from './constants';

class Piece {
    private readonly shapeName: string;
    private readonly max: number;
    private readonly positions: number[][][];
    private index: number;

    constructor(shapeName:string, positions: number[][][]) {
        this.positions = positions;
        this.shapeName = shapeName;
        this.index = 0;
        this.max = positions.length;
    }

    get shape(): number[][] {
        return this.positions[this.index];
    }

    rotate() {
        this.index = (this.index + 1) % this.max;
    }

    move(direction:Direction) {

    }
}

export default Piece;
