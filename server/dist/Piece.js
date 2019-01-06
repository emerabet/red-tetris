"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Piece {
    constructor(shapeName, positions) {
        this.positions = positions;
        this.shapeName = shapeName;
        this.index = 0;
        this.max = positions.length;
        this.positionRow = 0 - this.findFirstRow();
        this.positionCol = 3 + this.findFirstCol();
        this.previous = null;
        this.snapshotPosition();
    }
    findFirstRow() {
        for (let i = 0; i < this.positions[this.index].length; i += 1) {
            for (let j = 0; j < this.positions[this.index][i].length; j += 1) {
                if (this.positions[this.index][i][j] !== constants_1.CellState.Empty) {
                    return i;
                }
            }
        }
        return 0;
    }
    findFirstCol() {
        for (let col = 0; col < this.positions[this.index][0].length; col += 1) {
            for (let row = 0; row < this.positions[this.index].length; row += 1) {
                if (this.positions[this.index][row][col] !== constants_1.CellState.Empty) {
                    return col;
                }
            }
        }
        return 0;
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
            row: this.positionRow,
            col: this.positionCol,
        };
    }
    rotate() {
        this.index = (this.index + 1) % this.max;
    }
    rollback() {
        if (this.previous) {
            this.positionRow = this.previous.row;
            this.positionCol = this.previous.col;
        }
    }
    move(direction) {
        this.snapshotPosition();
        switch (direction) {
            case constants_1.Direction.Down: this.positionRow += 1;
            case constants_1.Direction.Left: this.positionCol -= 1;
            case constants_1.Direction.Right: this.positionCol += 1;
        }
    }
}
exports.default = Piece;
