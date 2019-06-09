import { EventEmitter } from 'events';
import Player from './Player';
import Board from './Board';
import BoardController from './BoardController';
import PieceFactory from './PieceFactory';
import { PlayerType, GameState, GameMode, IPlayerInfo } from './constants';

class Game extends EventEmitter {
    private room: string;
    private boards: Map<string, BoardController>; // SocketId, boardController
    private players: Map<string, Player>; // SocketId, Player
    private pieces: string[];
    private status: GameState;
    private mode: GameMode;

    constructor(room:string) {
        super();
        this.room = room;
        this.status = GameState.Opened;
        this.boards = new Map<string, BoardController>();
        this.players = new Map<string, Player>();
        this.pieces = [];
        this.mode = GameMode.Solo;
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
                this.mode = this.players.size > 1 ? GameMode.Multiplyaer : GameMode.Solo;
                this.boards.forEach((value) => {
                    value.run();
                });
            }
        });

        board.on('stop', (socketId:string) => {
            const player:Player|undefined = this.players.get(socketId);
            if (player !== undefined && player.isAdmin && this.status === GameState.OnGoing) {
                this.boards.forEach((value) => {
                    value.stop();
                });
                this.pieces.length = 0;
                this.status = GameState.Opened;
            }
        });

        board.on('malus', (socketId:string, nbLine: number) => {
            if (nbLine <= 0) {
                return ;
            }

            this.boards.forEach((value, key) => {
                if (key !== socketId) {
                    value.takeMalus(nbLine);
                }
            });
        });

        board.on('need', (index) => {
            if ((this.pieces.length - 1) - index <= 3) {
                this.createSetOfPieces();
            }
        });

        board.on('free', (socketId: string, isAdmin: boolean, username: string) => {
            this.players.delete(socketId);
            this.boards.delete(socketId);

            if (isAdmin && this.players.size > 0) {
                this.assignNewAdministrator();
            }

            if (this.boards.size === 0) {
                this.pieces.length = 0;
                delete this.pieces;
                this.emit('free_game', this.room);
                this.removeAllListeners();
            } else {
                this.checkWinner();
            }

            this.updateStatusGame(socketId, username, 'left');
        });

        board.on('game_over', ({ id, username }) => {
            this.updateStatusGame(id, username, 'lost');
            this.checkWinner();
        });
    }

    private checkWinner() {
        const hasWinner = this.hasWinner();
        if (this.status === GameState.OnGoing && hasWinner) {
            this.updateStatusGame(hasWinner.id, hasWinner.username, 'win');
            const b: BoardController = <BoardController>this.boards.get(hasWinner.id);
            b.stop(true);
            this.status = GameState.Opened;
        }
    }

    private hasWinner(): IPlayerInfo | null {
        if (this.mode === GameMode.Solo) {
            return null;
        }
        let countNotFinishedGame = 0;
        let currentPlayerInfo = null;

        this.boards.forEach((v) => {
            if (!v.getIsFinished()) {
                countNotFinishedGame += 1;
                currentPlayerInfo = v.getPlayerInfo();
            }
        });
        return countNotFinishedGame === 1 ? currentPlayerInfo : null;
    }

    private assignNewAdministrator(): void {
        const newAdmin = this.players.values().next().value;
        newAdmin.setRole(PlayerType.Admin);

        this.updateStatusGame(newAdmin.id, newAdmin.username, 'owner');
    }

    private updateStatusGame(socketId: string, username: string, action:string) {
        this.emit('update_game_state', {
            username,
            action,
            id: socketId,
            count: this.players.size,
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

            this.updateStatusGame(player.id, username, 'joined');

            this.initListeners(boardController);
            this.boards.set(socket.id, boardController);
        }
    }
}

export default Game;
