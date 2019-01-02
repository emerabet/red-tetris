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

    get player(): Player {
        return this.currentPlayer;
    }

    public place(piece: Piece) {
        this.currentBoard.fill(piece, piece.row, piece.col);
    }

    public log() {
        console.log('Name:', this.currentPlayer.username);
    }

    public run() {
        setTimeout(() => this.run(), 1 * 1000);
        this.log();
    }
}

export default BoardController;
