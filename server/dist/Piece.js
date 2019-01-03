"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Piece {
    constructor(shapeName, positions) {
        this.positions = positions;
        this.shapeName = shapeName;
        this.index = 0;
        this.max = positions.length;
        this.positionRow = 0;
        this.positionCol = 3;
    }
    get shape() {
        return this.positions[this.index];
    }
    get row() {
        return this.positionRow;
    }
    get col() {
        return this.positionCol;
    }
    rotate() {
        this.index = (this.index + 1) % this.max;
    }
    move(direction) {
        switch (direction) {
            case constants_1.Direction.Down: this.positionRow += 1;
            case constants_1.Direction.Left: this.positionCol -= 1;
            case constants_1.Direction.Right: this.positionCol += 1;
        }
    }
}
exports.default = Piece;
