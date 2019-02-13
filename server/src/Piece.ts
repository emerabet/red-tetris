import { Direction, CellState } from './constants';

class Piece {
    private readonly shapeName: string;
    private readonly max: number;
    private readonly positions: number[][][];
    private positionRow: number;
    private positionCol: number;
    private index: number;
    private previous: any;

    constructor(shapeName:string, positions: number[][][]) {
        this.positions = positions;
        this.shapeName = shapeName;
        this.index = 0;
        this.max = positions.length;
        this.positionRow = 0;
        this.positionCol = 3;
        this.previous = null;
        this.snapshotPosition();
    }

    get name(): string {
        return this.shapeName;
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

    private snapshotPosition() {
        this.previous = {
            index: this.index,
            row: this.positionRow,
            col: this.positionCol,
        };
    }

    rotate() {
        this.snapshotPosition();
        this.index = (this.index + 1) % this.max;
    }

    rollback() {
        if (this.previous) {
            this.index = this.previous.index;
            this.positionRow = this.previous.row;
            this.positionCol = this.previous.col;
        }
    }

    move(direction:Direction) {
        this.snapshotPosition();
        switch (direction) {
        case Direction.Down: this.positionRow += 1; break;
        case Direction.Left: this.positionCol -= 1; break;
        case Direction.Right: this.positionCol += 1; break;
        }
    }
}

export default Piece;
