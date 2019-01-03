import Player from './Player';
import Board from './Board';
import Piece from './Piece';
import PieceFactory from './PieceFactory';
import { Direction } from './constants';

class BoardController {
    private currentPlayer: Player;
    private currentBoard: Board;
    private currentPiece: Piece;

    constructor(player:Player, board:Board) {
        this.currentPlayer = player;
        this.currentBoard = board;
        this.currentPiece = PieceFactory.createRandomPiece();
    }

    get board(): Board {
        return this.currentBoard;
    }

    get player(): Player {
        return this.currentPlayer;
    }

    public place(piece: Piece) {
        this.currentBoard.fill(piece);
    }

    public log() {
        console.log('Name:', this.currentPlayer.username);
    }

    public run() {
        setTimeout(() => this.run(), 1 * 1000);
        let i = 0;

        this.currentBoard.fill(this.currentPiece);
        console.log(this.currentBoard.grid);
        this.currentBoard.clear(this.currentPiece);
        console.log(`---- Turn n°${i} ----`);
        this.currentPiece.rotate();
        this.currentPiece.move(Direction.Down);
        i = i + 1;
    }
}

export default BoardController;
