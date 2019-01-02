"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardController {
    constructor(player, board) {
        this.currentPlayer = player;
        this.currentBoard = board;
    }
    get board() {
        return this.currentBoard;
    }
}
exports.default = BoardController;
