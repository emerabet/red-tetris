import { Direction } from './constants';

class Piece {
    private readonly shapeName: string;
    private readonly max: number;
    private readonly positions: number[][][];
    private positionRow: number;
    private positionCol: number;
    private index: number;

    constructor(shapeName:string, positions: number[][][]) {
        this.positions = positions;
        this.shapeName = shapeName;
        this.index = 0;
        this.max = positions.length;
        this.positionRow = 0;
        this.positionCol = 5;
    }

    get shape(): number[][] {
        return this.positions[this.index];
    }

    get row(): number {
        return this.positionRow;
    }

    get col(): number {
        return this.positionCol;
    }

    rotate() {
        this.index = (this.index + 1) % this.max;
    }
    
    move(direction:Direction) {

    }
}

export default Piece;
