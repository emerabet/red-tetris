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
const constants_1 = require("./constants");
class Game extends events_1.EventEmitter {
    constructor(room) {
        super();
        this.room = room;
        this.isStarted = false;
        this.boards = new Map();
        this.players = new Map();
        this.pieces = [];
        this.createSetOfPieces();
    }
    createSetOfPieces() {
        for (let i = 0; i < 3; i += 1) {
            this.pieces.push(PieceFactory_1.default.createRandomPiece());
        }
    }
    resetSetOfPieces() {
        this.pieces.length = 0;
        this.createSetOfPieces();
    }
    initListeners(board) {
        board.on('start', () => {
            this.boards.forEach((value, key) => {
                value.run();
            });
        });
        board.on('malus', (socketId) => {
            this.boards.forEach((value, key) => {
                if (key !== socketId) {
                    value.takeMalus();
                }
            });
        });
        board.on('need', (index) => {
            console.log('index need:: ', index);
            if ((this.pieces.length - 1) - index <= 3) {
                this.createSetOfPieces();
            }
        });
        board.on('free', (socketId) => {
            this.players.delete(socketId);
            this.boards.delete(socketId);
            if (this.boards.size === 0) {
                this.pieces.length = 0;
                delete this.pieces;
                this.emit('freeGame', this.room);
                this.removeAllListeners();
            }
        });
    }
    createBoard(height, width, socket) {
        if (!this.isStarted) {
            const role = this.players.size === 0 ? constants_1.PlayerType.Admin : constants_1.PlayerType.Player;
            const player = new Player_1.default(socket.id, this.room, role);
            this.players.set(socket.id, player);
            const board = new Board_1.default(height, width);
            const boardController = new BoardController_1.default(player, board, socket, this.pieces);
            this.initListeners(boardController);
            this.boards.set(socket.id, boardController);
        }
    }
}
exports.default = Game;
