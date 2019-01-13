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

    private findFirstRow(): number {
        for (let i = 0; i < this.positions[this.index].length; i += 1) {
            for (let j = 0; j < this.positions[this.index][i].length; j += 1) {
                if (this.positions[this.index][i][j] !== CellState.Empty) {
                    return i;
                }
            }
        }
        return 0;
    }

    private findFirstCol(): number {
        for (let col = 0; col < this.positions[this.index][0].length; col += 1) {
            for (let row = 0; row < this.positions[this.index].length; row += 1) {
                if (this.positions[this.index][row][col] !== CellState.Empty) {
                    return col;
                }
            }
        }
        return 0;
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
