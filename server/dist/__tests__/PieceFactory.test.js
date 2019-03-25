"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PieceFactory_1 = __importDefault(require("./../PieceFactory"));
const mockedPositions = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 2, 2],
        [2, 2, 0],
        [0, 0, 0],
    ],
    [
        [3, 0, 0],
        [3, 3, 3],
        [0, 0, 0],
    ],
    [
        [0, 0, 4],
        [4, 4, 4],
        [0, 0, 0],
    ],
    [
        [0, 5, 0],
        [5, 5, 5],
        [0, 0, 0],
    ],
    [
        [0, 0, 6, 0],
        [0, 0, 6, 0],
        [0, 0, 6, 0],
        [0, 0, 6, 0],
    ],
    [
        [0, 7, 7],
        [0, 7, 7],
    ],
];
it('should return piece Z', () => {
    const piece = PieceFactory_1.default.createPiece('Z');
    expect(piece.shape).toEqual(mockedPositions[0]);
});
it('should return piece Z with incorrect letter', () => {
    const piece = PieceFactory_1.default.createPiece('X');
    expect(piece.shape).toEqual(mockedPositions[0]);
});
it('should return piece S', () => {
    const piece = PieceFactory_1.default.createPiece('S');
    expect(piece.shape).toEqual(mockedPositions[1]);
});
it('should return piece J', () => {
    const piece = PieceFactory_1.default.createPiece('J');
    expect(piece.shape).toEqual(mockedPositions[2]);
});
it('should return piece L', () => {
    const piece = PieceFactory_1.default.createPiece('L');
    expect(piece.shape).toEqual(mockedPositions[3]);
});
it('should return piece T', () => {
    const piece = PieceFactory_1.default.createPiece('T');
    expect(piece.shape).toEqual(mockedPositions[4]);
});
it('should return piece I', () => {
    const piece = PieceFactory_1.default.createPiece('I');
    expect(piece.shape).toEqual(mockedPositions[5]);
});
it('should return piece O', () => {
    const piece = PieceFactory_1.default.createPiece('O');
    expect(piece.shape).toEqual(mockedPositions[6]);
});
it('should return a valid letter (ZSJLTIO)', () => {
    const letter = PieceFactory_1.default.createRandomPiece();
    expect('ZSJLTIO').toContain(letter);
});
