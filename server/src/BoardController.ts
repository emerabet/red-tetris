import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import Piece from './Piece';
import PieceFactory from './PieceFactory';
import { Direction, From, CellState } from './constants';
import ICollisionStrategy from './Interfaces/ICollisionStrategy';
import CollisionDownStrategy from './Strategies/CollisionDownStrategy';
import CollisionTopStrategy from './Strategies/CollisionTopStrategy';
import { Socket } from 'socket.io';

const strategies: any = {
    [Direction.Down]: new CollisionDownStrategy(),
    [Direction.Top]: new CollisionTopStrategy(),
};

class BoardController {
    private currentPlayer: Player;
    private currentBoard: Board;
    private currentPiece: Piece;
    private timer: any;
    private socket: Socket;
    private eventEmitter: EventEmitter;

    constructor(player:Player, board:Board, socket:Socket, emitter: EventEmitter) {
        this.currentPlayer = player;
        this.currentBoard = board;
        this.socket = socket;
        this.eventEmitter = emitter;
        this.currentPiece = PieceFactory.createRandomPiece();

        this.drop = this.drop.bind(this);
        this.init();
        // this.currentBoard.clear(this.currentPiece);
        // this.currentBoard.addLockedRow();
        // this.currentBoard.addLockedRow();
        // this.currentBoard.addLockedRow();
        // this.place();
    }

    get board(): Board {
        return this.currentBoard;
    }

    get player(): Player {
        return this.currentPlayer;
    }

    public log() {
        console.log('Name:', this.currentPlayer.username);
    }

    private checkCollision(direction: Direction): boolean {
        const collision:ICollisionStrategy = strategies[direction];
        if (collision.check(this.currentBoard, this.currentPiece)) {
            console.log('Collision detected');
            //clearInterval(this.timer);
            return true;
        }

        return false;
    }

    private check() {
        for (let i = 0; i < this.currentPiece.shape.length; i += 1) {
            for (let j = 0; j < this.currentPiece.shape[i].length; j += 1) {
                if (this.currentPiece.shape[i][j] !== CellState.Empty) {
                    if (!this.currentBoard.grid[this.currentPiece.row + i]
                        || this.currentBoard.grid[this.currentPiece.row + i][this.currentPiece.col + j] !== CellState.Empty) {
                        console.log('COLLISION DETECTED!!');
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private newPiece() {
        console.log('[ACTION] NEW PIECE GENERATED ');
        this.currentPiece = PieceFactory.createRandomPiece();
        if (this.check()) {
            console.log(' /!\\ END GAME /!\\');
            console.log(this.currentPiece);
            this.place();
            console.log(this.currentBoard.grid);
            clearInterval(this.timer);
        } else {
            // this.draw();
        }
    }

    private draw() {
        this.place();
        console.log(this.currentBoard.grid);
        this.socket.emit('state', this.currentBoard.grid);
        console.log('emitted');
        this.currentBoard.clear(this.currentPiece);
        console.log('------------');
    }

    private moveDown() {
        this.currentPiece.move(Direction.Down);
        if (this.check()) {
            this.currentPiece.rollback();
            this.place();
            this.checkLine();
            this.newPiece();
            this.draw();
        } else {
            this.draw();
        }
    }

    private checkLine() {
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

    private place() {
        this.currentBoard.fill(this.currentPiece);
    }

    private moveSide(dir:Direction) {
        this.currentPiece.move(dir);
        if (this.check()) {
            this.currentPiece.rollback();
        }
    }

    private drop() {
        this.moveDown();
    }

    private rotate() {
        this.currentPiece.rotate();
        if (this.check()) {
            this.currentPiece.rollback();
        }
    }

    private addMalus() {
        this.eventEmitter.emit('malus', this.socket.id);
    }

    public run() {
        // const timer = setInterval(() => this.run(), 1 * 1000);
        // this.currentPiece = PieceFactory.createRandomPiece();
        // console.log(this.currentPiece);
        this.timer = setInterval(this.drop, 1000);
    }

    private init() {
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
            this.moveSide(Direction.Left);
            this.draw();
        });

        this.socket.on('right', () => {
            console.log('right received');
            this.moveSide(Direction.Right);
            this.draw();
        });
    }
}

export default BoardController;
