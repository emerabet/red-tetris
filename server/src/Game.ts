import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import BoardController from './BoardController';
import PieceFactory from './PieceFactory';

class Game {
    private room: string;
    private eventGame: EventEmitter;
    private isStarted: boolean;
    private boards: Map<string, BoardController>; // SocketId, boardController
    private eventBoard: EventEmitter;
    private players: Map<string, Player>; // SocketId, Player
    private pieces: string[];

    constructor(room:string, eventGame:EventEmitter) {
        this.room = room;
        this.eventGame = eventGame;
        this.isStarted = false;
        this.boards = new Map<string, BoardController>();
        this.eventBoard = new EventEmitter();
        this.players = new Map<string, Player>();
        this.pieces = [];

        this.init();
        this.createSetOfPieces();
    }

    private createSetOfPieces() {
        for (let i = 0; i < 3; i += 1) {
            this.pieces.push(PieceFactory.createRandomPiece());
        }

        console.log('list of pieces: ', this.pieces);
    }

    private init() {
        this.eventBoard.on('testevent', (id:number) => {
            console.log(`Malus added by socketId: ${id}`);
            console.log('List pieces:: ', this.pieces);
        });

        this.eventBoard.on('need', (index) => {
            console.log('index need:: ', index);
            if ((this.pieces.length - 1) - index <= 1) {
                this.pieces.push(PieceFactory.createRandomPiece());
                console.log('piece added to the list');
            }
        });

        this.eventBoard.on('free', (socketId: string) => {
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

    public getBoards(): Map<string, BoardController> {
        return this.boards;
    }

    public createBoard(height:number, width:number, socket:SocketIO.Socket): void {
        if (!this.isStarted) {
            const player = new Player(socket.id);
            this.players.set(socket.id, player);
            const board:Board = new Board(height, width);
            const boardController = new BoardController(
                player,
                board,
                socket,
                this.eventBoard,
                this.pieces);
            this.boards.set(socket.id, boardController);
        }
    }
}

export default Game;
