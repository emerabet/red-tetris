"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const PieceFactory_1 = __importDefault(require("./PieceFactory"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class BoardController extends events_1.EventEmitter {
    constructor(room, player, board, socket, pieces) {
        super();
        this.currentPlayer = player;
        this.currentBoard = board;
        this.room = room;
        this.socket = socket;
        this.indexPiece = 0;
        this.pieces = pieces;
        this.currentPiece = PieceFactory_1.default.createPiece(pieces[this.indexPiece]);
        this.speed = 1000;
        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.isFinished = false;
        this.drop = this.drop.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.rotate = this.rotate.bind(this);
        this.moveSide = this.moveSide.bind(this);
        this.init();
    }
    updateScore() {
        this.level = Math.ceil(this.lines / 4);
        this.score = (this.level + this.lines) * this.lines;
    }
    check() {
        for (let i = 0; i < this.currentPiece.shape.length; i += 1) {
            for (let j = 0; j < this.currentPiece.shape[i].length; j += 1) {
                if (this.currentPiece.shape[i][j] !== constants_1.CellState.Empty) {
                    const grid = this.currentBoard.grid;
                    if (!grid[this.currentPiece.row + i] ||
                        grid[this.currentPiece.row + i][this.currentPiece.col + j]
                            !== constants_1.CellState.Empty) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    newPiece() {
        this.askPiece();
        this.indexPiece += 1;
        this.currentPiece = PieceFactory_1.default.createPiece(this.pieces[this.indexPiece]);
        if (this.check()) {
            this.place();
            clearInterval(this.timer);
            this.isFinished = true;
        }
    }
    getNextPieces() {
        let str = '';
        for (let i = this.indexPiece; i < this.indexPiece + 3; i += 1) {
            str += this.pieces[i];
        }
        return str;
    }
    draw() {
        const spectre = this.currentBoard.getSpectre();
        this.place();
        const state = {
            spectre,
            id: this.socket.id,
            grid: utils_1.deepCopy(this.currentBoard.grid),
            score: this.score,
            level: this.level,
            pieces: this.getNextPieces(),
        };
        this.socket.emit('state', state);
        this.socket
            .to(this.room)
            .emit('spectre', { spectre, id: this.socket.id });
        this.currentBoard.clear(this.currentPiece);
    }
    moveDown() {
        this.currentPiece.move(constants_1.Direction.Down);
        if (this.check()) {
            this.currentPiece.rollback();
            this.place();
            this.checkLine();
            this.newPiece();
        }
    }
    checkLine() {
        for (let i = this.currentBoard.grid.length - 1; i >= 0; i -= 1) {
            if (this.currentBoard.isFull(i) === true) {
                this.currentBoard.removeRowAt(i);
                this.currentBoard.addEmptyRow();
                this.addMalusToOther();
                this.lines += 1;
                i += 1;
            }
        }
        this.updateScore();
    }
    place() {
        this.currentBoard.fill(this.currentPiece);
    }
    moveSide(dir) {
        this.currentPiece.move(dir);
        if (this.check()) {
            this.currentPiece.rollback();
        }
    }
    drop() {
        this.moveDown();
        this.draw();
    }
    rotate() {
        this.currentPiece.rotate();
        if (this.check()) {
            this.currentPiece.rollback();
        }
    }
    takeMalus() {
        if (this.isFinished === true) {
            return;
        }
        this.moveSide(constants_1.Direction.Up);
        this.currentBoard.clear(this.currentPiece);
        this.currentBoard.addLockedRow();
        this.draw();
    }
    addMalusToOther() {
        this.emit('malus', this.socket.id);
    }
    askPiece() {
        this.emit('need', this.indexPiece);
    }
    freeBoard(socketId) {
        clearInterval(this.timer);
        this.socket.removeAllListeners();
        delete this.socket;
        delete this.timer;
        delete this.currentPiece;
        delete this.currentBoard;
        delete this.currentPlayer;
        delete this.pieces;
        this.emit('free', socketId);
        this.removeAllListeners();
    }
    run() {
        this.draw();
        this.timer = setInterval(this.drop, this.speed);
    }
    execute(action, arg = null) {
        if (this.isFinished === true) {
            return;
        }
        action(arg);
        this.draw();
    }
    init() {
        this.socket.on('init', () => {
            // TODO: Vérifier si c'est bien l'admin de la partie.
            this.emit('start');
        });
        this.socket.on('disconnect', () => {
            this.freeBoard(this.socket.id);
        });
        this.socket.on('down', () => {
            this.execute(this.moveDown);
        });
        this.socket.on('up', () => {
            this.execute(this.rotate);
        });
        this.socket.on('left', () => {
            this.execute(this.moveSide, constants_1.Direction.Left);
        });
        this.socket.on('right', () => {
            this.execute(this.moveSide, constants_1.Direction.Right);
        });
    }
}
exports.default = BoardController;
