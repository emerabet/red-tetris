import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import BoardController from './BoardController';
import PieceFactory from './PieceFactory';
import { PlayerType, GameState } from './constants';

class Game extends EventEmitter {
    private room: string;
    private boards: Map<string, BoardController>; // SocketId, boardController
    private players: Map<string, Player>; // SocketId, Player
    private pieces: string[];
    private status: GameState;

    constructor(room:string) {
        super();
        this.room = room;
        this.status = GameState.Opened;
        this.boards = new Map<string, BoardController>();
        this.players = new Map<string, Player>();
        this.pieces = [];
    }

    get name(): string {
        return this.room;
    }

    private createSetOfPieces() {
        for (let i = 0; i < 3; i += 1) {
            this.pieces.push(PieceFactory.createRandomPiece());
        }
    }

    private initListeners(board: BoardController) {
        board.on('start', (socketId:string) => {
            const player:Player|undefined = this.players.get(socketId);
            if (player !== undefined && player.isAdmin) {
                this.createSetOfPieces();
                this.status = GameState.OnGoing;
                this.boards.forEach((value, key) => {
                    value.run();
                });
            }
        });

        board.on('stop', (socketId:string) => {
            const player:Player|undefined = this.players.get(socketId);
            if (player !== undefined && player.isAdmin && this.status === GameState.OnGoing) {
                this.pieces.length = 0;
                this.boards.forEach((value, key) => {
                    value.stop();
                });
                this.status = GameState.Opened;
            }
        });

        board.on('malus', (socketId:string) => {
            this.boards.forEach((value, key) => {
                if (key !== socketId) {
                    value.takeMalus();
                }
            });
        });

        board.on('need', (index) => {
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
                this.emit('free_game', this.room);
                this.emit('update_player_count', this.players.size);
                this.removeAllListeners();
            }
        });
    }

    public createBoard(height:number,
                       width:number,
                       socket:SocketIO.Socket,
                       username: string): void {
        if (this.status === GameState.Opened) {
            socket.join(this.room);
            const role: number = this.players.size === 0 ? PlayerType.Admin : PlayerType.Player;
            const player = new Player(socket.id, username, this.room, role);
            this.players.set(socket.id, player);
            const board:Board = new Board(height, width);
            const boardController = new BoardController(
                player,
                board,
                socket,
                this.pieces);
            this.emit('update_player_count', this.players.size);
            this.initListeners(boardController);
            this.boards.set(socket.id, boardController);
        }
    }
}

export default Game;
