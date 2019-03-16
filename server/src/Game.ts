import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import BoardController from './BoardController';
import PieceFactory from './PieceFactory';

class Game extends EventEmitter {
    private room: string;
    private isStarted: boolean;
    private boards: Map<string, BoardController>; // SocketId, boardController
    private players: Map<string, Player>; // SocketId, Player
    private pieces: string[];

    constructor(room:string) {
        super();
        this.room = room;
        this.isStarted = false;
        this.boards = new Map<string, BoardController>();
        this.players = new Map<string, Player>();
        this.pieces = [];

        this.createSetOfPieces();
    }

    private createSetOfPieces() {
        for (let i = 0; i < 3; i += 1) {
            this.pieces.push(PieceFactory.createRandomPiece());
        }
    }

    private initListeners(board: BoardController) {
        board.on('start', () => {
            this.boards.forEach((value, key) => {
                value.run();
            });
        });

        board.on('malus', (socketId:string) => {
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

        board.on('free', (socketId: string) => {
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

    public createBoard(height:number, width:number, socket:SocketIO.Socket): void {
        if (!this.isStarted) {
            const player = new Player(socket.id);
            this.players.set(socket.id, player);
            const board:Board = new Board(height, width);
            const boardController = new BoardController(
                this.room,
                player,
                board,
                socket,
                this.pieces);
            this.initListeners(boardController);
            this.boards.set(socket.id, boardController);
        }
    }
}

export default Game;
