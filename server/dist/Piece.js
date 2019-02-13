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
        this.previous = null;
        this.snapshotPosition();
    }
    get name() {
        return this.shapeName;
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
    snapshotPosition() {
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
    move(direction) {
        this.snapshotPosition();
        switch (direction) {
            case constants_1.Direction.Down:
                this.positionRow += 1;
                break;
            case constants_1.Direction.Left:
                this.positionCol -= 1;
                break;
            case constants_1.Direction.Right:
                this.positionCol += 1;
                break;
        }
    }
}
exports.default = Piece;
