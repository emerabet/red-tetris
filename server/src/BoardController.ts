import Player from './Player';
import Board from './Board';
import Piece from './Piece';
import PieceFactory from './PieceFactory';
import { Direction, From } from './constants';
import ICollisionStrategy from './Interfaces/ICollisionStrategy';
import CollisionDownStrategy from './Strategies/CollisionDownStrategy';
import CollisionTopStrategy from './Strategies/CollisionTopStrategy';

const strategies: any = {
    [Direction.Down]: new CollisionDownStrategy(),
    [Direction.Top]: new CollisionTopStrategy(),
};

class BoardController {
    private currentPlayer: Player;
    private currentBoard: Board;
    private currentPiece: Piece;
    private nbTick: number;
    private timer: any;

    constructor(player:Player, board:Board) {
        this.currentPlayer = player;
        this.currentBoard = board;
        this.nbTick = 0;
        this.currentPiece = PieceFactory.createRandomPiece();

        this.test = this.test.bind(this);
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

    private checkCollision(direction: Direction): boolean {
        const collision:ICollisionStrategy = strategies[direction];
        if (collision.check(this.currentBoard, this.currentPiece)) {
            console.log('Collision detected');
            //clearInterval(this.timer);
            return true;
        }

        return false;
    }

    private test() {
        console.log(`• Start turn: ${this.nbTick} `);

        if (this.checkCollision(Direction.Down)) {
            this.currentPiece.rollback();
            this.currentBoard.fill(this.currentPiece);
            this.currentPiece = PieceFactory.createRandomPiece();
        }
        this.currentBoard.fill(this.currentPiece);
        console.log(this.currentBoard.grid);
        console.log(' ------------ ');
        this.currentBoard.clear(this.currentPiece);
        // this.currentPiece.rotate();
        this.currentPiece.move(Direction.Down);
        this.nbTick += 1;
        console.log('New position: row: ', this.currentPiece.row, ' col:  ', this.currentPiece.col);
    }

    public run() {
        //const timer = setInterval(() => this.run(), 1 * 1000);
        this.timer = setInterval(this.test, 200);
    }
}

export default BoardController;
