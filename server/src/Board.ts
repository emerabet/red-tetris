import Piece from './Piece';

class Board {
    private score:number;
    private height: number;
    private width: number;
    private playfield: number[][];

    constructor(height:number, width:number) {
        this.score = 0;
        this.playfield = [];
        this.height = height;
        this.width = width;

        this.createBoard(height, width);
    }

    get grid(): number[][] {
        return this.playfield;
    }

    private createBoard(height:number, width:number): void {
        for (let i = 0; i < height; i += 1) {
            const arr:number[] = [];
            arr.length = width;
            arr.fill(0);
            this.playfield.push(arr);
        }
    }

    public clearAll() {
        for (let i = 0; i < this.playfield.length; i += 1) {
            for (let j = 0; j < this.playfield[i].length; j += 1) {
                this.playfield[i][j] = 0;
            }
        }
    }

    public clear(piece: Piece): void {
        const startRow = piece.row;
        const startCol = piece.col;

        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                this.playfield[startRow + i][startCol + j] = 0;
            }
        }
    }

    public fill(piece: Piece): void {
        const startRow = piece.row;
        const startCol = piece.col;

        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== 0) {
                    this.playfield[startRow + i][startCol + j] = piece.shape[i][j];
                }
            }
        }
    }
}

export default Board;
