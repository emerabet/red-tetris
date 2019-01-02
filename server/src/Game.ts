import Player from './Player';
import Board from './Board';
import BoardController from './BoardController';

class Game {
    private isStarted: boolean;
    private boards: BoardController[];

    constructor() {
        this.isStarted = false;
        this.boards = [];
    }

    public createBoard(player:Player, height:number, width:number): void {
        if (!this.isStarted) {
            const board:Board = new Board(height, width);
            const boardController = new BoardController(player, board);
            this.boards.push(boardController);
        }
    }
}

export default Game;
