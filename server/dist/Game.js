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
        this.status = constants_1.GameState.Opened;
        this.boards = new Map();
        this.players = new Map();
        this.pieces = [];
        this.mode = constants_1.GameMode.Solo;
    }
    get name() {
        return this.room;
    }
    createSetOfPieces() {
        for (let i = 0; i < 3; i += 1) {
            this.pieces.push(PieceFactory_1.default.createRandomPiece());
        }
    }
    initListeners(board) {
        board.on('start', (socketId) => {
            const player = this.players.get(socketId);
            if (player !== undefined && player.isAdmin) {
                this.createSetOfPieces();
                this.status = constants_1.GameState.OnGoing;
                this.mode = this.players.size > 1 ? constants_1.GameMode.Multiplyaer : constants_1.GameMode.Solo;
                this.boards.forEach((value) => {
                    value.run();
                });
            }
        });
        board.on('stop', (socketId) => {
            const player = this.players.get(socketId);
            if (player !== undefined && player.isAdmin && this.status === constants_1.GameState.OnGoing) {
                this.boards.forEach((value) => {
                    value.stop();
                });
                this.pieces.length = 0;
                this.status = constants_1.GameState.Opened;
            }
        });
        board.on('malus', (socketId, nbLine) => {
            if (nbLine <= 0) {
                return;
            }
            this.boards.forEach((value, key) => {
                if (key !== socketId) {
                    value.takeMalus(nbLine);
                }
            });
        });
        board.on('need', (index) => {
            if ((this.pieces.length - 1) - index <= 3) {
                this.createSetOfPieces();
            }
        });
        board.on('free', (socketId, isAdmin, username) => {
            this.players.delete(socketId);
            this.boards.delete(socketId);
            if (isAdmin && this.players.size > 0) {
                this.assignNewAdministrator();
            }
            if (this.boards.size === 0) {
                this.pieces.length = 0;
                delete this.pieces;
                this.emit('free_game', this.room);
                this.removeAllListeners();
            }
            else {
                this.checkWinner();
            }
            this.updateStatusGame(socketId, username, 'left');
        });
        board.on('game_over', ({ id, username }) => {
            this.updateStatusGame(id, username, 'lost');
            this.checkWinner();
        });
    }
    checkWinner() {
        const hasWinner = this.hasWinner();
        if (this.status === constants_1.GameState.OnGoing && hasWinner) {
            this.updateStatusGame(hasWinner.id, hasWinner.username, 'win');
            const b = this.boards.get(hasWinner.id);
            b.stop(true);
            this.status = constants_1.GameState.Opened;
        }
    }
    hasWinner() {
        if (this.mode === constants_1.GameMode.Solo) {
            return null;
        }
        let countNotFinishedGame = 0;
        let currentPlayerInfo = null;
        this.boards.forEach((v) => {
            if (!v.getIsFinished()) {
                countNotFinishedGame += 1;
                currentPlayerInfo = v.getPlayerInfo();
            }
        });
        return countNotFinishedGame === 1 ? currentPlayerInfo : null;
    }
    assignNewAdministrator() {
        const newAdmin = this.players.values().next().value;
        newAdmin.setRole(constants_1.PlayerType.Admin);
        this.updateStatusGame(newAdmin.id, newAdmin.username, 'owner');
    }
    updateStatusGame(socketId, username, action) {
        this.emit('update_game_state', {
            username,
            action,
            id: socketId,
            count: this.players.size,
        });
    }
    createBoard(height, width, socket, username) {
        if (this.status === constants_1.GameState.Opened) {
            socket.join(this.room);
            const role = this.players.size === 0 ? constants_1.PlayerType.Admin : constants_1.PlayerType.Player;
            const player = new Player_1.default(socket.id, username, this.room, role);
            this.players.set(socket.id, player);
            const board = new Board_1.default(height, width);
            const boardController = new BoardController_1.default(player, board, socket, this.pieces);
            this.updateStatusGame(player.id, username, 'joined');
            this.initListeners(boardController);
            this.boards.set(socket.id, boardController);
        }
    }
}
exports.default = Game;
