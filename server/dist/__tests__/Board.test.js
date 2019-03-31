"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./../Board"));
const PieceFactory_1 = __importDefault(require("./../PieceFactory"));
const constants_1 = require("../constants");
const mockedBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
it('create Board instance', () => {
    const board = new Board_1.default(8, 10);
    expect(board.grid).toBeDefined();
    expect(board.gridHeight).toBeDefined();
    expect(board.gridWidth).toBeDefined();
    expect(board.grid).toEqual(mockedBoard);
    expect(board.gridHeight).toEqual(8);
    expect(board.gridWidth).toEqual(10);
});
it('should add locked row to the bottom', () => {
    const board = new Board_1.default(8, 10);
    const locked = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    board.addLockedRow();
    expect(board.grid[7]).toEqual(locked);
});
it('should return false to isFull', () => {
    const board = new Board_1.default(8, 6);
    expect(board.isFull(0)).toEqual(false);
});
it('should return false to partially filled row', () => {
    const board = new Board_1.default(8, 6);
    const piece = PieceFactory_1.default.createPiece('O');
    board.fill(piece);
    expect(board.isFull(0)).toEqual(false);
});
it('should return false to isFull for locked row', () => {
    const board = new Board_1.default(8, 6);
    board.addLockedRow();
    expect(board.isFull(7)).toEqual(false);
});
it('should return true to isFull', () => {
    const board = new Board_1.default(8, 10);
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    ];
    Object.defineProperty(board, 'playfield', { value: mock });
    expect(board.isFull(7)).toEqual(true);
});
it('should add piece to the correct position', () => {
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    const piece = PieceFactory_1.default.createPiece('O');
    board.fill(piece);
    expect(board.grid).toEqual(mock);
});
it('should not add piece into the grid', () => {
    const mock = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(3, 10);
    const piece = {};
    board.fill(piece);
    expect(board.grid).toEqual(mock);
});
it('should clear cells at piece position', () => {
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    const piece = PieceFactory_1.default.createPiece('O');
    Object.defineProperty(board, 'playfield', { value: mock });
    board.clear(piece);
    expect(board.grid).toEqual(mock);
});
it('should not clear cells', () => {
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(3, 10);
    const piece = {};
    Object.defineProperty(board, 'playfield', { value: mock });
    board.clear(piece);
    expect(board.grid).toEqual(mock);
});
it('should clear all rows', () => {
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];
    const board = new Board_1.default(8, 10);
    Object.defineProperty(board, 'playfield', { value: mock });
    board.clearAll();
    expect(board.grid).toEqual(mockedBoard);
});
it('should add an empty row', () => {
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const mock2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    Object.defineProperty(board, 'playfield', { value: mock });
    board.addEmptyRow();
    expect(board.grid).toEqual(mock2);
});
it('should remove row from the bottom', () => {
    const mock = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const mock2 = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    Object.defineProperty(board, 'playfield', { value: mock });
    board.removeRow(constants_1.From.Bottom);
    expect(board.grid).toEqual(mock2);
});
it('should remove row from the top', () => {
    const mock = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const mock2 = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    Object.defineProperty(board, 'playfield', { value: mock });
    board.removeRow(constants_1.From.Top);
    expect(board.grid).toEqual(mock2);
});
it('should remove row to the specified index', () => {
    const mock = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const mock2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    Object.defineProperty(board, 'playfield', { value: mock });
    board.removeRowAt(1);
    expect(board.grid).toEqual(mock2);
});
it('should return the expect spectre string', () => {
    const spectre = '7777667777';
    const mock = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    ];
    const board = new Board_1.default(8, 10);
    Object.defineProperty(board, 'playfield', { value: mock });
    expect(board.getSpectre()).toEqual(spectre);
});
