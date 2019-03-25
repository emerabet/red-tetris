"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const Piece_1 = __importDefault(require("./Piece"));
const constants_1 = require("./constants");
class PieceFactory {
    static createPiece(shape) {
        const positions = this.allPieces[shape] || this.allPieces[constants_1.Z];
        const piece = new Piece_1.default(shape, positions);
        return piece;
    }
    static randomC(qty) {
        const array = crypto_1.default.randomBytes(qty).toJSON().data;
        return parseInt(array.toString('dec'), 10);
    }
    static random(min, max) {
        return Math.floor((this.randomC(21) / 256 * (max - min + 1)) + min);
    }
    static createRandomPiece() {
        const min = 0;
        const max = Object.keys(this.allPieces).length - 1;
        const index = this.random(min, max);
        const letter = Object.keys(this.allPieces)[index];
        return letter;
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
