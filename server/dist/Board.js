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
    addRow(state, from) {
        const arr = [];
        arr.length = this.width;
        arr.fill(state);
        if (from === constants_1.From.Bottom) {
            this.playfield.push(arr);
        }
        else {
            this.playfield.unshift(arr);
        }
    }
    createBoard() {
        for (let i = 0; i < this.height; i += 1) {
            this.addRow(constants_1.CellState.Empty, constants_1.From.Bottom);
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
    isFull(rowIndex) {
        for (let j = 0; j < this.width; j += 1) {
            if (this.playfield[rowIndex][j] === constants_1.CellState.Empty
                || this.playfield[rowIndex][j] === constants_1.CellState.Locked) {
                return false;
            }
        }
        return true;
    }
    addLockedRow() {
        this.removeRow(constants_1.From.Top);
        this.addRow(constants_1.CellState.Locked, constants_1.From.Bottom);
    }
    addEmptyRow() {
        this.addRow(constants_1.CellState.Empty, constants_1.From.Top);
    }
    removeRow(from) {
        if (from === constants_1.From.Top) {
            this.playfield.shift();
        }
        else {
            this.playfield.pop();
        }
    }
    removeRowAt(rowIndex) {
        this.playfield.splice(rowIndex, 1);
    }
}
exports.default = Board;
