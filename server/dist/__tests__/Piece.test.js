"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./../Piece"));
const constants_1 = require("./../constants");
const mockedPositions = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ],
];
it('create piece instance', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    expect(piece.shape).toBeDefined();
});
it('create piece instance with right name', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    expect(piece.name).toEqual('Z');
});
it('should be to initial row position', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    expect(piece.row).toEqual(0);
});
it('should be to initial col position', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    expect(piece.col).toEqual(3);
});
it('should move to left', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.move(constants_1.Direction.Left);
    expect(piece.col).toEqual(2);
});
it('should move to right', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.move(constants_1.Direction.Right);
    expect(piece.col).toEqual(4);
});
it('should move down', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.move(constants_1.Direction.Down);
    expect(piece.row).toEqual(1);
});
it('should move up', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.move(constants_1.Direction.Up);
    expect(piece.row).toEqual(-1);
});
it('should rotate to the next position', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.rotate();
    expect(piece.shape).toEqual(mockedPositions[1]);
});
it('should return to the previous position if exists', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.rotate();
    piece.rollback();
    expect(piece.shape).toEqual(mockedPositions[0]);
});
it('should not rollback if previous position doesnt exist', () => {
    const piece = new Piece_1.default('Z', mockedPositions);
    piece.rollback();
    expect(piece.shape).toEqual(mockedPositions[0]);
});
