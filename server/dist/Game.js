"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Player_1 = __importDefault(require("./Player"));
const Board_1 = __importDefault(require("./Board"));
const BoardController_1 = __importDefault(require("./BoardController"));
const PieceFactory_1 = __importDefault(require("./PieceFactory"));
class Game {
    constructor(room, eventGame) {
        this.room = room;
        this.eventGame = eventGame;
        this.isStarted = false;
        this.boards = new Map();
        this.eventBoard = new events_1.EventEmitter();
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
        this.eventBoard.on('testevent', (id) => {
            console.log(`Malus added by socketId: ${id}`);
            console.log('List pieces:: ', this.pieces);
        });
        this.eventBoard.on('need', (index) => {
            console.log('index need:: ', index);
            if ((this.pieces.length - 1) - index <= 1) {
                this.pieces.push(PieceFactory_1.default.createRandomPiece());
                console.log('piece added to the list');
            }
        });
        this.eventBoard.on('free', (socketId) => {
            this.players.delete(socketId);
            this.boards.delete(socketId);
            if (this.boards.size === 0) {
                this.pieces.length = 0;
                delete this.pieces;
                this.eventBoard.removeAllListeners();
                delete this.eventBoard;
                this.eventGame.emit('freeGame', this.room);
                delete this.eventGame;
            }
            console.log('je suis dans onFree');
        });
    }
    getBoards() {
        return this.boards;
    }
    createBoard(height, width, socket) {
        if (!this.isStarted) {
            const player = new Player_1.default(socket.id);
            this.players.set(socket.id, player);
            const board = new Board_1.default(height, width);
            const boardController = new BoardController_1.default(player, board, socket, this.eventBoard, this.pieces);
            this.boards.set(socket.id, boardController);
        }
    }
}
exports.default = Game;
