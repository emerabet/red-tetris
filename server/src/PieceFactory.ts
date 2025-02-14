import crypto from 'crypto';
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

    public static createPiece(shape:string): Piece {
        const positions:number[][][] = this.allPieces[shape] || this.allPieces[Z];
        const piece = new Piece(shape, positions);
        return piece;
    }

    private static randomC(qty:number) {
        const array:any = crypto.randomBytes(qty).toJSON().data;
        return parseInt(array.toString('dec'), 10);
    }

    private static random(min:number, max:number) {
        return Math.floor((this.randomC(21) / 256 * (max - min + 1)) + min);
    }

    public static createRandomPiece(): string {
        const min = 0;
        const max: number = Object.keys(this.allPieces).length - 1;
        const index: number = this.random(min, max);
        const letter: string = Object.keys(this.allPieces)[index];
        return letter;
    }
}

export default PieceFactory;
