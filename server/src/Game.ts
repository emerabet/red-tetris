import { EventEmitter } from 'events';
import { Socket } from 'socket.io';
import Player from './Player';
import Piece from './Piece';
import Board from './Board';
import BoardController from './BoardController';
import PieceFactory from './PieceFactory';

class Game {
    private isStarted: boolean;
    private boards: BoardController[];
    private eventEmitter: EventEmitter;
    private players: Map<string, Player>; // SocketId, Player
    private pieces: Piece[];

    constructor() {
        this.isStarted = false;
        this.boards = [];
        this.eventEmitter = new EventEmitter();
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
        this.eventEmitter.on('testevent', (id:number) => {
            console.log(`Malus added by socketId: ${id}`);
            console.log('List pieces:: ', this.pieces);
        });

        this.eventEmitter.on('need', (index) => {
            console.log('index need:: ', index);
            if ((this.pieces.length - 1) - index <= 1) {
                this.pieces.push(PieceFactory.createRandomPiece());
                console.log('piece added to the list');
            }
        });
    }

    public getBoards(): BoardController[] {
        return this.boards;
    }

    public createBoard(player:Player, height:number, width:number, socket:Socket): void {
        if (!this.isStarted) {
            const board:Board = new Board(height, width);
            const boardController = new BoardController(player, board, socket, this.eventEmitter, this.pieces);
            this.boards.push(boardController);
        }
    }
}

export default Game;
