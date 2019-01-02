import Piece from './Piece';
import {
    SHAPES_Z,
    SHAPES_S,
    SHAPES_J,
    SHAPES_L,
    SAHPES_T,
    SHAPES_I,
    SHAPES_O,
    Z,
    S,
    J,
    L,
    T,
    I,
    O,
} from './constants';

class PieceFactory {
    private static readonly allPieces = {
        [Z]: [...SHAPES_Z],
        [S]: [...SHAPES_S],
        [J]: [...SHAPES_J],
        [L]: [...SHAPES_L],
        [T]: [...SAHPES_T],
        [I]: [...SHAPES_I],
        [O]: [...SHAPES_O],
    };

    private static createPiece(shape:string): Piece {
        const positions:number[][][] = this.allPieces[shape] || this.allPieces[Z];
        const piece = new Piece(shape, positions);
        return piece;
    }

    public static createRandomPiece(): Piece {
        const max: number = Object.keys(this.allPieces).length;
        const index: number = Math.floor(Math.random() * Math.floor(max));
        const letter: string = Object.keys(this.allPieces)[index];
        return this.createPiece(letter);
    }

    static print() {
        const p = this.createRandomPiece();
        p.rotate();
        console.log(p.shape);
    }
}

export default PieceFactory;
