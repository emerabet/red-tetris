"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./Piece"));
const constants_1 = require("./constants");
class PieceFactory {
    static createPiece(shape) {
        const positions = this.allPieces[shape] || this.allPieces[constants_1.Z];
        const piece = new Piece_1.default(shape, positions);
        return piece;
    }
    static createRandomPiece() {
        const max = Object.keys(this.allPieces).length;
        const index = Math.floor(Math.random() * Math.floor(max));
        const letter = Object.keys(this.allPieces)[index];
        return this.createPiece(letter);
    }
    static print() {
        const p = this.createRandomPiece();
        p.rotate();
        console.log(p.shape);
    }
}
PieceFactory.allPieces = {
    [constants_1.Z]: [...constants_1.SHAPES_Z],
    [constants_1.S]: [...constants_1.SHAPES_S],
    [constants_1.J]: [...constants_1.SHAPES_J],
    [constants_1.L]: [...constants_1.SHAPES_L],
    [constants_1.T]: [...constants_1.SAHPES_T],
    [constants_1.I]: [...constants_1.SHAPES_I],
    [constants_1.O]: [...constants_1.SHAPES_O],
};
exports.default = PieceFactory;
