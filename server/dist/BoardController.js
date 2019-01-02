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
    get player() {
        return this.currentPlayer;
    }
    place(piece) {
        this.currentBoard.fill(piece, piece.row, piece.col);
    }
    log() {
        console.log('Name:', this.currentPlayer.username);
    }
    run() {
        setTimeout(() => this.run(), 1 * 1000);
        this.log();
    }
}
exports.default = BoardController;
