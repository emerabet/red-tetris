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
        this.positionCol = 3;
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
        switch (direction) {
        case Direction.Down: this.positionRow += 1;
        case Direction.Left: this.positionCol -= 1;
        case Direction.Right: this.positionCol += 1;
        }
    }
}

export default Piece;
