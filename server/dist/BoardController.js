"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PieceFactory_1 = __importDefault(require("./PieceFactory"));
const constants_1 = require("./constants");
const CollisionDownStrategy_1 = __importDefault(require("./Strategies/CollisionDownStrategy"));
const CollisionTopStrategy_1 = __importDefault(require("./Strategies/CollisionTopStrategy"));
const strategies = {
    [constants_1.Direction.Down]: new CollisionDownStrategy_1.default(),
    [constants_1.Direction.Top]: new CollisionTopStrategy_1.default(),
};
class BoardController {
    constructor(player, board, socket, emitter) {
        this.currentPlayer = player;
        this.currentBoard = board;
        this.socket = socket;
        this.eventEmitter = emitter;
        this.currentPiece = PieceFactory_1.default.createRandomPiece();
        this.drop = this.drop.bind(this);
        this.init();
        // this.currentBoard.clear(this.currentPiece);
        // this.currentBoard.addLockedRow();
        // this.currentBoard.addLockedRow();
        // this.currentBoard.addLockedRow();
        // this.place();
    }
    get board() {
        return this.currentBoard;
    }
    get player() {
        return this.currentPlayer;
    }
    log() {
        console.log('Name:', this.currentPlayer.username);
    }
    checkCollision(direction) {
        const collision = strategies[direction];
        if (collision.check(this.currentBoard, this.currentPiece)) {
            console.log('Collision detected');
            //clearInterval(this.timer);
            return true;
        }
        return false;
    }
    check() {
        for (let i = 0; i < this.currentPiece.shape.length; i += 1) {
            for (let j = 0; j < this.currentPiece.shape[i].length; j += 1) {
                if (this.currentPiece.shape[i][j] !== constants_1.CellState.Empty) {
                    if (!this.currentBoard.grid[this.currentPiece.row + i]
                        || this.currentBoard.grid[this.currentPiece.row + i][this.currentPiece.col + j] !== constants_1.CellState.Empty) {
                        console.log('COLLISION DETECTED!!');
                        return true;
                    }
                }
            }
        }
        return false;
    }
    newPiece() {
        console.log('[ACTION] NEW PIECE GENERATED ');
        this.currentPiece = PieceFactory_1.default.createRandomPiece();
        if (this.check()) {
            console.log(' /!\\ END GAME /!\\');
            console.log(this.currentPiece);
            this.place();
            console.log(this.currentBoard.grid);
            clearInterval(this.timer);
        }
        else {
            // this.draw();
        }
    }
    draw() {
        this.place();
        console.log(this.currentBoard.grid);
        this.socket.emit('state', this.currentBoard.grid);
        console.log('emitted');
        this.currentBoard.clear(this.currentPiece);
        console.log('------------');
    }
    moveDown() {
        this.currentPiece.move(constants_1.Direction.Down);
        if (this.check()) {
            this.currentPiece.rollback();
            this.place();
            this.checkLine();
            this.newPiece();
            this.draw();
        }
        else {
            this.draw();
        }
    }
    checkLine() {
        // Vérifier si des lignes sont pleines
        for (let i = this.currentBoard.grid.length - 1; i >= 0; i -= 1) {
            if (this.currentBoard.isFull(i) === true) {
                this.currentBoard.removeRowAt(i);
                this.currentBoard.addEmptyRow();
                this.addMalus();
                console.log('Full row, row removed');
            }
        }
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
    }
    rotate() {
        this.currentPiece.rotate();
        if (this.check()) {
            this.currentPiece.rollback();
        }
    }
    addMalus() {
        this.eventEmitter.emit('malus', this.socket.id);
    }
    run() {
        // const timer = setInterval(() => this.run(), 1 * 1000);
        // this.currentPiece = PieceFactory.createRandomPiece();
        // console.log(this.currentPiece);
        this.timer = setInterval(this.drop, 1000);
    }
    init() {
        this.socket.on('init', () => {
            console.log('First print');
            this.draw();
            this.run();
        });
        this.socket.on('down', () => {
            console.log('down received');
            this.moveDown();
        });
        this.socket.on('up', () => {
            console.log('up received, try rotate');
            this.rotate();
            this.draw();
        });
        this.socket.on('left', () => {
            console.log('left received');
            this.moveSide(constants_1.Direction.Left);
            this.draw();
        });
        this.socket.on('right', () => {
            console.log('right received');
            this.moveSide(constants_1.Direction.Right);
            this.draw();
        });
    }
}
exports.default = BoardController;
