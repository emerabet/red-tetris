import Player from './Player';
import Board from './Board';
import BoardController from './BoardController';
import { EventEmitter } from 'events';
import { Socket } from 'socket.io';

class Game {
    private isStarted: boolean;
    private boards: BoardController[];
    private eventEmitter: EventEmitter;

    constructor() {
        this.isStarted = false;
        this.boards = [];
        this.eventEmitter = new EventEmitter();

        this.init();
    }

    private init() {
        this.eventEmitter.on('testevent', (id:number) => {
            console.log(`Malus added by socketId: ${id}`);
        });
    }

    public getBoards(): BoardController[] {
        return this.boards;
    }

    public createBoard(player:Player, height:number, width:number, socket:Socket): void {
        if (!this.isStarted) {
            const board:Board = new Board(height, width);
            const boardController = new BoardController(player, board, socket, this.eventEmitter);
            this.boards.push(boardController);
        }
    }
}

export default Game;
