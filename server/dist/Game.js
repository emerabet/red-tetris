"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Board_1 = __importDefault(require("./Board"));
const BoardController_1 = __importDefault(require("./BoardController"));
const PieceFactory_1 = __importDefault(require("./PieceFactory"));
class Game {
    constructor() {
        this.isStarted = false;
        this.boards = [];
        this.eventEmitter = new events_1.EventEmitter();
        this.players = new Map();
        this.pieces = [];
        this.init();
        this.createSetOfPieces();
    }
    createSetOfPieces() {
        for (let i = 0; i < 3; i += 1) {
            this.pieces.push(PieceFactory_1.default.createRandomPiece());
        }
        console.log('list of pieces: ', this.pieces);
    }
    init() {
        this.eventEmitter.on('testevent', (id) => {
            console.log(`Malus added by socketId: ${id}`);
            console.log('List pieces:: ', this.pieces);
        });
        this.eventEmitter.on('need', (index) => {
            console.log('index need:: ', index);
            if ((this.pieces.length - 1) - index <= 1) {
                this.pieces.push(PieceFactory_1.default.createRandomPiece());
                console.log('piece added to the list');
            }
        });
    }
    getBoards() {
        return this.boards;
    }
    createBoard(player, height, width, socket) {
        if (!this.isStarted) {
            const board = new Board_1.default(height, width);
            const boardController = new BoardController_1.default(player, board, socket, this.eventEmitter, this.pieces);
            this.boards.push(boardController);
        }
    }
}
exports.default = Game;
