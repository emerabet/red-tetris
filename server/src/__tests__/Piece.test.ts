import Piece from './../Piece';
import { Direction } from './../constants';

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
    const piece: Piece = new Piece('Z', mockedPositions);
    expect(piece.shape).toBeDefined();
});

it('create piece instance with right name', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    expect(piece.name).toEqual('Z');
});

it('should be to initial row position', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    expect(piece.row).toEqual(0);
});

it('should be to initial col position', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    expect(piece.col).toEqual(3);
});

it('should move to left', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    piece.move(Direction.Left);
    expect(piece.col).toEqual(2);
});

it('should move to right', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    piece.move(Direction.Right);
    expect(piece.col).toEqual(4);
});

it('should move down', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    piece.move(Direction.Down);
    expect(piece.row).toEqual(1);
});

it('should move up', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    piece.move(Direction.Up);
    expect(piece.row).toEqual(-1);
});

it('should rotate to the next position', () => {
    const piece: Piece = new Piece('Z', mockedPositions);

    piece.rotate();
    expect(piece.shape).toEqual(mockedPositions[1]);
});

it('should return to the previous position if exists', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    piece.rotate();
    piece.rollback();
    expect(piece.shape).toEqual(mockedPositions[0]);
});

it('should not rollback if previous position doesnt exist', () => {
    const piece: Piece = new Piece('Z', mockedPositions);
    piece.rollback();
    expect(piece.shape).toEqual(mockedPositions[0]);
});
