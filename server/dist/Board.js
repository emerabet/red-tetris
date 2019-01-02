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
}
exports.default = Board;
