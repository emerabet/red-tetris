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
    constructor(player, board) {
        this.currentPlayer = player;
        this.currentBoard = board;
        this.nbTick = 0;
        this.currentPiece = PieceFactory_1.default.createRandomPiece();
        this.test = this.test.bind(this);
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
    checkCollision(direction) {
        const collision = strategies[direction];
        if (collision.check(this.currentBoard, this.currentPiece)) {
            console.log('Collision detected');
            //clearInterval(this.timer);
            return true;
        }
        return false;
    }
    test() {
        console.log(`• Start turn: ${this.nbTick} `);
        if (this.nbTick === 0 && this.checkCollision(constants_1.Direction.Top)) {
            console.log('End game');
            clearInterval(this.timer);
            return;
        }
        if (this.checkCollision(constants_1.Direction.Down)) {
            console.log('là');
            this.currentPiece.rollback();
            this.currentBoard.fill(this.currentPiece);
            console.log('Rollback position: row: ', this.currentPiece.row, ' col:  ', this.currentPiece.col);
            this.currentPiece = PieceFactory_1.default.createRandomPiece();
        }
        this.currentBoard.fill(this.currentPiece);
        console.log(this.currentBoard.grid);
        console.log(' ------------ ');
        this.currentBoard.clear(this.currentPiece);
        // this.currentPiece.rotate();
        this.currentPiece.move(constants_1.Direction.Down);
        this.nbTick += 1;
        console.log('New position: row: ', this.currentPiece.row, ' col:  ', this.currentPiece.col);
    }
    run() {
        //const timer = setInterval(() => this.run(), 1 * 1000);
        this.timer = setInterval(this.test, 200);
    }
}
exports.default = BoardController;
