import Player from './Player';
import Board from './Board';
import Piece from './Piece';

class BoardController {
    private currentPlayer: Player;
    private currentBoard: Board;

    constructor(player:Player, board:Board) {
        this.currentPlayer = player;
        this.currentBoard = board;
    }

    get board(): Board {
        return this.currentBoard;
    }
}

export default BoardController;
