"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Piece {
    constructor(shapeName, positions) {
        this.positions = positions;
        this.shapeName = shapeName;
        this.index = 0;
        this.max = positions.length;
    }
    get shape() {
        return this.positions[this.index];
    }
    rotate() {
        this.index = (this.index + 1) % this.max;
    }
    move(direction) {
    }
}
exports.default = Piece;
