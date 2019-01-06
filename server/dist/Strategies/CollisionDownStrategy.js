"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class CollisionDownStrategy {
    check(board, piece) {
        const height = board.gridHeight - 1;
        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== constants_1.CellState.Empty) {
                    const total = piece.row + i;
                    if (total > height || board.grid[total][piece.col + j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
exports.default = CollisionDownStrategy;
