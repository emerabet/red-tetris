"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./Board"));
const BoardController_1 = __importDefault(require("./BoardController"));
class Game {
    constructor() {
        this.isStarted = false;
        this.boards = [];
    }
    createBoard(player, height, width) {
        if (!this.isStarted) {
            const board = new Board_1.default(height, width);
            const boardController = new BoardController_1.default(player, board);
            this.boards.push(boardController);
        }
    }
}
exports.default = Game;
