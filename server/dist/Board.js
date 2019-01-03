"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(height, width) {
        this.score = 0;
        this.playfield = [];
        this.height = height;
        this.width = width;
        this.createBoard(height, width);
    }
    get grid() {
        return this.playfield;
    }
    createBoard(height, width) {
        for (let i = 0; i < height; i += 1) {
            const arr = [];
            arr.length = width;
            arr.fill(0);
            this.playfield.push(arr);
        }
    }
    clearAll() {
        for (let i = 0; i < this.playfield.length; i += 1) {
            for (let j = 0; j < this.playfield[i].length; j += 1) {
                this.playfield[i][j] = 0;
            }
        }
    }
    clear(piece) {
        const startRow = piece.row;
        const startCol = piece.col;
        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                this.playfield[startRow + i][startCol + j] = 0;
            }
        }
    }
    fill(piece) {
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
exports.default = Board;
