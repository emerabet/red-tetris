import Piece from "./Piece";

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

    public fill(piece: Piece, row: number, col: number): void {
        let startRow = row;
        let startCol = col;

        for (let i = 0; i < piece.shape.length; i += 1) {

        }
    }
}

export default Board;
