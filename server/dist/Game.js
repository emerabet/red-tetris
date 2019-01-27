"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./Board"));
const BoardController_1 = __importDefault(require("./BoardController"));
const events_1 = require("events");
class Game {
    constructor() {
        this.isStarted = false;
        this.boards = [];
        this.eventEmitter = new events_1.EventEmitter();
        this.players = new Map();
        this.init();
    }
    init() {
        this.eventEmitter.on('testevent', (id) => {
            console.log(`Malus added by socketId: ${id}`);
        });
    }
    getBoards() {
        return this.boards;
    }
    createBoard(player, height, width, socket) {
        if (!this.isStarted) {
            const board = new Board_1.default(height, width);
            const boardController = new BoardController_1.default(player, board, socket, this.eventEmitter);
            this.boards.push(boardController);
        }
    }
}
exports.default = Game;
