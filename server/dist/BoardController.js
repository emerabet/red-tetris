"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PieceFactory_1 = __importDefault(require("./PieceFactory"));
const constants_1 = require("./constants");
class BoardController {
    constructor(player, board) {
        this.currentPlayer = player;
        this.currentBoard = board;
        this.currentPiece = PieceFactory_1.default.createRandomPiece();
    }
    get board() {
        return this.currentBoard;
    }
    get player() {
        return this.currentPlayer;
    }
    place(piece) {
        this.currentBoard.fill(piece);
    }
    log() {
        console.log('Name:', this.currentPlayer.username);
    }
    run() {
        setTimeout(() => this.run(), 1 * 1000);
        let i = 0;
        this.currentBoard.fill(this.currentPiece);
        console.log(this.currentBoard.grid);
        this.currentBoard.clear(this.currentPiece);
        console.log(`---- Turn n°${i} ----`);
        this.currentPiece.rotate();
        this.currentPiece.move(constants_1.Direction.Down);
        i = i + 1;
    }
}
exports.default = BoardController;
