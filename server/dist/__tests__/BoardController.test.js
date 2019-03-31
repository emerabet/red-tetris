"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoardController_1 = __importDefault(require("./../BoardController"));
const Player_1 = __importDefault(require("./../Player"));
const constants_1 = require("./../constants");
const Board_1 = __importDefault(require("./../Board"));
const PieceFactory_1 = __importDefault(require("../PieceFactory"));
jest.useFakeTimers();
it('should create a boardController instance', () => {
    const player = new Player_1.default('socketId', 'playerName', 'roomName', constants_1.PlayerType.Admin);
    const board = new Board_1.default(8, 10);
    const pieces = [];
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    const boardController = new BoardController_1.default(player, board, socket, pieces);
    expect(boardController).toBeDefined();
});
it('should run the game loop', () => {
    const player = new Player_1.default('socketId', 'playerName', 'roomName', constants_1.PlayerType.Admin);
    const board = new Board_1.default(8, 10);
    const pieces = [];
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.emit = jest.fn().mockImplementation();
    socket.to = jest.fn().mockImplementation(() => {
        return {
            emit: () => null,
        };
    });
    const boardController = new BoardController_1.default(player, board, socket, pieces);
    boardController.run();
    jest.runAllTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(Reflect.get(boardController, 'timer')).toBeTruthy();
});
it('should stop the game loop', () => {
    const player = new Player_1.default('socketId', 'playerName', 'roomName', constants_1.PlayerType.Admin);
    const board = new Board_1.default(8, 10);
    const pieces = [];
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.emit = jest.fn().mockImplementation();
    socket.to = jest.fn().mockImplementation(() => {
        return {
            emit: () => null,
        };
    });
    const boardController = new BoardController_1.default(player, board, socket, pieces);
    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory_1.default.createPiece('O'),
    });
    boardController.stop();
    jest.runAllTimers();
    expect(Reflect.get(boardController, 'timer')).toBeFalsy();
});
it('should add locked row to the board', () => {
    const player = new Player_1.default('socketId', 'playerName', 'roomName', constants_1.PlayerType.Admin);
    const board = new Board_1.default(8, 10);
    const pieces = [];
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.emit = jest.fn().mockImplementation();
    socket.to = jest.fn().mockImplementation(() => {
        return {
            emit: () => null,
        };
    });
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
    const expected = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];
    Object.defineProperty(board, 'playfield', { value: mock });
    const boardController = new BoardController_1.default(player, board, socket, pieces);
    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory_1.default.createPiece('O'),
    });
    boardController.takeMalus();
    board.fill(Reflect.get(boardController, 'currentPiece'));
    expect(Reflect.get(board, 'playfield')).toEqual(expected);
});
