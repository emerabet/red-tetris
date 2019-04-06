import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import Piece from './Piece';
import PieceFactory from './PieceFactory';
import { Direction, CellState, IPlayerInfo } from './constants';
import { deepCopy } from './utils';

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
    private level: number;
    private lines: number;
    private isFinished: boolean;

    constructor(player:Player, board:Board, socket:SocketIO.Socket, pieces: string[]) {
        super();
        this.timer = null;
        this.currentPlayer = player;
        this.currentBoard = board;
        this.socket = socket;
        this.pieces = pieces;
        this.drop = this.drop.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.rotate = this.rotate.bind(this);
        this.moveSide = this.moveSide.bind(this);
        this.init();
    }

    private prepare() {
        this.currentBoard.clearAll();
        this.indexPiece = 0;
        this.currentPiece = PieceFactory.createPiece(this.pieces[this.indexPiece]);
        this.speed = 1000;
        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.isFinished = false;
    }

    private updateScore() {
        this.level = Math.ceil(this.lines / 4);
        this.score = (this.level + this.lines) * this.lines;
    }

    public getIsFinished(): boolean {
        return this.isFinished;
    }

    public getPlayerInfo(): IPlayerInfo {
        return {
            id: this.socket.id,
            username: this.currentPlayer.username,
        };
    }

    private check() {
        for (let i = 0; i < this.currentPiece.shape.length; i += 1) {
            for (let j = 0; j < this.currentPiece.shape[i].length; j += 1) {
                if (this.currentPiece.shape[i][j] !== CellState.Empty) {
                    const grid = this.currentBoard.grid;
                    if (!grid[this.currentPiece.row + i] ||
                        grid[this.currentPiece.row + i][this.currentPiece.col + j]
                        !== CellState.Empty) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private newPiece() {
        this.askPiece();
        this.indexPiece += 1;
        this.currentPiece = PieceFactory.createPiece(this.pieces[this.indexPiece]);
        if (this.check()) {
            this.endOfGame();
        }
    }

    private endOfGame(): void {
        this.place();
        clearInterval(this.timer);
        this.isFinished = true;
        const data = {
            id: this.currentPlayer.id,
            username: this.currentPlayer.username,
        };
        this.emit('game_over', data);
    }

    private getNextPieces(): string {
        let str = '';
        for (let i = this.indexPiece; i < this.indexPiece + 3; i += 1) {
            str += this.pieces[i];
        }
        return str;
    }

    private draw() {
        const spectre = this.currentBoard.getSpectre();
        this.place();
        const state = {
            spectre,
            id: this.socket.id,
            username: this.currentPlayer.username,
            grid: deepCopy(this.currentBoard.grid),
            score: this.score,
            level: this.level,
            pieces: this.getNextPieces(),
        };
        this.socket.emit('state', state);
        this.socket
            .to(this.currentPlayer.room)
            .emit('spectre', {
                spectre,
                id: this.socket.id,
                username: this.currentPlayer.username,
            });
        this.currentBoard.clear(this.currentPiece);
    }

    private moveDown() {
        this.currentPiece.move(Direction.Down);
        if (this.check()) {
            this.currentPiece.rollback();
            this.place();
            this.checkLine();
            this.newPiece();
        }
    }

    private checkLine() {
        for (let i = this.currentBoard.grid.length - 1; i >= 0; i -= 1) {
            if (this.currentBoard.isFull(i)) {
                this.currentBoard.removeRowAt(i);
                this.currentBoard.addEmptyRow();
                this.addMalusToOther();
                this.lines += 1;
                i += 1;
            }
        }
        this.updateScore();
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
        this.draw();
    }

    private rotate() {
        this.currentPiece.rotate();
        if (this.check()) {
            this.currentPiece.rollback();
        }
    }

    public takeMalus() {
        if (this.isFinished) {
            return ;
        }
        this.moveSide(Direction.Up);
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
        const isAdmin = this.currentPlayer.isAdmin;
        const username = this.currentPlayer.username;
        clearInterval(this.timer);
        this.socket.leave(this.currentPlayer.room);
        this.socket.removeAllListeners();
        delete this.socket;
        delete this.timer;
        delete this.currentPiece;
        delete this.currentBoard;
        delete this.currentPlayer;
        delete this.pieces;
        this.emit('free', socketId, isAdmin, username);
        this.removeAllListeners();
    }

    public run() {
        this.currentBoard.clearAll();
        clearInterval(this.timer);
        this.prepare();
        this.draw();
        this.timer = setInterval(this.drop, this.speed);
    }

    private execute(action:any, arg:any = null) {
        if (this.isFinished) {
            return ;
        }
        action(arg);
        this.draw();
    }

    public stop(win:boolean = false) {
        this.isFinished = true;
        clearInterval(this.timer);
        if (!win) {
            this.currentBoard.clearAll();
        }
        this.draw();
    }

    private init() {
        this.socket.on('init', () => {
            this.emit('start', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            this.freeBoard(this.socket.id);
        });

        this.socket.on('restart', () => {
            this.emit('stop', this.socket.id);
            this.emit('start', this.socket.id);
        });

        this.socket.on('stop', () => {
            this.emit('stop', this.socket.id);
        });

        this.socket.on('down', () => {
            this.execute(this.moveDown);
        });

        this.socket.on('up', () => {
            this.execute(this.rotate);
        });

        this.socket.on('left', () => {
            this.execute(this.moveSide, Direction.Left);
        });

        this.socket.on('right', () => {
            this.execute(this.moveSide, Direction.Right);
        });
    }
}

export default BoardController;
