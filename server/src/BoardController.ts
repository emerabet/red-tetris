import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import Piece from './Piece';
import PieceFactory from './PieceFactory';
import { Direction, CellState } from './constants';

import { Socket } from 'socket.io';

class BoardController extends EventEmitter {
    private currentPlayer: Player;
    private currentBoard: Board;
    private currentPiece: Piece;
    private pieces: string[];
    private timer: any;
    private socket: Socket;
    private indexPiece: number;
    private speed: number;
    private score: number;
    private isFinished: boolean;

    constructor(player:Player, board:Board, socket:SocketIO.Socket, pieces: string[]) {
        super();
        this.currentPlayer = player;
        this.currentBoard = board;
        this.socket = socket;
        this.indexPiece = 0;
        this.pieces = pieces; // Pass by value the reference to the array of piece created from Game.
        this.currentPiece = PieceFactory.createPiece(pieces[this.indexPiece]);
        this.speed = 1000;
        this.score = 0;
        this.isFinished = false;

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
        this.askPiece();
        this.indexPiece += 1;
        this.currentPiece = PieceFactory.createPiece(this.pieces[this.indexPiece]);
        if (this.check()) {
            console.log(' /!\\ END GAME /!\\');
            console.log(this.currentPiece);
            this.place();
            console.log(this.currentBoard.grid);
            clearInterval(this.timer);
            this.isFinished = true;
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
                this.addMalusToOther();
                console.log('Full row, row removed');
                i += 1;
            } else {
                console.log('not full:: ', i);
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

    public addMalus() {
        this.currentBoard.clear(this.currentPiece);
        this.currentBoard.addLockedRow();
        this.draw();
    }

    private addMalusToOther() {
        this.emit('malus', this.socket.id);
    }

    private askPiece() {
        this.emit('need', this.indexPiece);
    }

    private freeBoard(socketId: string) {
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

    public run() {
        this.timer = setInterval(this.drop, this.speed);
    }

    private init() {
        this.socket.on('init', () => {
            console.log('First print');
            this.draw();
            this.run();
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected: ', this.socket.id);
            this.freeBoard(this.socket.id);
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
