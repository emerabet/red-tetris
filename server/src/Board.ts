import Piece from './Piece';
import { CellState, From } from './constants';

class Board {
    private readonly height: number;
    private readonly width: number;
    private playfield: number[][];

    constructor(height:number, width:number) {
        this.playfield = [];
        this.height = height;
        this.width = width;

        this.createBoard();
    }

    get grid(): number[][] {
        return this.playfield;
    }

    get gridHeight(): number {
        return this.height;
    }

    get gridWidth(): number {
        return this.width;
    }

    private addRow(state: CellState, from: From): void {
        const arr:number[] = [];
        arr.length = this.width;
        arr.fill(state);
        if (from === From.Bottom) {
            this.playfield.push(arr);
        } else {
            this.playfield.unshift(arr);
        }
    }

    private createBoard(): void {
        for (let i = 0; i < this.height; i += 1) {
            this.addRow(CellState.Empty, From.Bottom);
        }
    }

    public clearAll() {
        for (let i = 0; i < this.playfield.length; i += 1) {
            for (let j = 0; j < this.playfield[i].length; j += 1) {
                this.playfield[i][j] = CellState.Empty;
            }
        }
    }

    public clear(piece: Piece): void {
        const startRow = piece.row;
        const startCol = piece.col;

        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== CellState.Empty) {
                    this.playfield[startRow + i][startCol + j] = CellState.Empty;
                }
            }
        }
    }

    public fill(piece: Piece): void {
        const startRow = piece.row;
        const startCol = piece.col;

        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== CellState.Empty) {
                    this.playfield[startRow + i][startCol + j] = piece.shape[i][j];
                }
            }
        }
    }

    public isFull(rowIndex: number) {
        for (let j = 0; j < this.width; j += 1) {
            if (this.playfield[rowIndex][j] === CellState.Empty
                || this.playfield[rowIndex][j] === CellState.Locked) {
                return false;
            }
        }
        return true;
    }

    public addLockedRow(): void {
        this.removeRow(From.Top);
        this.addRow(CellState.Locked, From.Bottom);
    }

    public addEmptyRow(): void {
        this.addRow(CellState.Empty, From.Top);
    }

    public removeRow(from: From): void {
        if (from === From.Top) {
            this.playfield.shift();
        } else {
            this.playfield.pop();
        }
    }

    public removeRowAt(rowIndex: number) {
        this.playfield.splice(rowIndex, 1);
    }
}

export default Board;
