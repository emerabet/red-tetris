"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Board {
    constructor(height, width) {
        this.score = 0;
        this.playfield = [];
        this.height = height;
        this.width = width;
        this.createBoard();
    }
    get grid() {
        return this.playfield;
    }
    get gridHeight() {
        return this.height;
    }
    get gridWidth() {
        return this.width;
    }
    addRow(state) {
        const arr = [];
        arr.length = this.width;
        arr.fill(state);
        this.playfield.push(arr);
    }
    createBoard() {
        for (let i = 0; i < this.height; i += 1) {
            this.addRow(constants_1.CellState.Empty);
        }
    }
    clearAll() {
        for (let i = 0; i < this.playfield.length; i += 1) {
            for (let j = 0; j < this.playfield[i].length; j += 1) {
                this.playfield[i][j] = constants_1.CellState.Empty;
            }
        }
    }
    clear(piece) {
        const startRow = piece.row;
        const startCol = piece.col;
        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== constants_1.CellState.Empty) {
                    this.playfield[startRow + i][startCol + j] = constants_1.CellState.Empty;
                }
            }
        }
    }
    fill(piece) {
        const startRow = piece.row;
        const startCol = piece.col;
        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== constants_1.CellState.Empty) {
                    this.playfield[startRow + i][startCol + j] = piece.shape[i][j];
                }
            }
        }
    }
    addLockedRow() {
        this.addRow(constants_1.CellState.Locked);
    }
    removeRow(from) {
        if (from === constants_1.From.Top) {
            this.playfield.shift();
        }
        else {
            this.playfield.pop();
        }
    }
}
exports.default = Board;
