import Board from './../Board';
import PieceFactory from './../PieceFactory';

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
    const board: Board = new Board(8, 10);
    expect(board.grid).toBeDefined();
    expect(board.gridHeight).toBeDefined();
    expect(board.gridWidth).toBeDefined();
    expect(board.grid).toEqual(mockedBoard);
    expect(board.gridHeight).toEqual(8);
    expect(board.gridWidth).toEqual(10);
});

it('should add locked row to the bottom', () => {
    const board: Board = new Board(8, 10);
    const locked = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    board.addLockedRow();
    expect(board.grid[7]).toEqual(locked);
});

it('should clear all rows', () => {
    const board: Board = new Board(8, 10);
    board.addLockedRow();
    board.addLockedRow();
    board.addLockedRow();
    board.clearAll();
    expect(board.grid).toEqual(mockedBoard);
});

it('should return false to isFull', () => {
    const board: Board = new Board(8, 6);
    expect(board.isFull(0)).toEqual(false);
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

    const board: Board = new Board(8, 10);
    const piece = PieceFactory.createPiece('O');

    board.fill(piece);
    expect(board.grid).toEqual(mock);
});

// it('should return true to isFull', () => {
//     const mockFull = [
//         [1, 1, 1, 1, 1, 1],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0],
//     ];

//     const mockGrid = jest.fn();
//     const board: Board = new Board(8, 6);
// });
