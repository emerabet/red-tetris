"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./../Game"));
const constants_1 = require("./../constants");
it('create game instance with the rigth name', () => {
    const game = new Game_1.default('RoomName');
    expect(game.name).toBe('RoomName');
});
it('create game instance', () => {
    const game = new Game_1.default('RoomName');
    expect(game.name).toBeDefined();
});
it('should create a new boardController as Admin in opened Game', () => {
    const game = new Game_1.default('RoomName');
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards');
    expect(socket.join).toHaveBeenCalledTimes(1);
    expect(boards.size).toEqual(1);
});
it('should create a new boardController as player in opened Game', () => {
    const game = new Game_1.default('RoomName');
    const socket1 = {
        id: 'socketId1',
    };
    const socket2 = {
        id: 'socketId2',
    };
    socket1.on = jest.fn().mockImplementation();
    socket1.join = jest.fn().mockImplementation();
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket1, 'playerName1');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards');
    expect(socket1.join).toHaveBeenCalledTimes(1);
    expect(socket2.join).toHaveBeenCalledTimes(1);
    expect(boards.size).toEqual(2);
});
it('should not create a new boardController in not opened Game', () => {
    const game = new Game_1.default('RoomName');
    Object.defineProperty(game, 'status', { value: constants_1.GameState.OnGoing });
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards');
    expect(socket.join).toHaveBeenCalledTimes(0);
    expect(boards.size).toEqual(0);
});
it('should start the game for every players', () => {
    const game = new Game_1.default('RoomName');
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    const socket2 = {
        id: 'socketId2',
    };
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards');
    const bc = boards.get('socketId');
    const bc2 = boards.get('socketId2');
    bc.run = jest.fn().mockImplementation();
    bc2.run = jest.fn().mockImplementation();
    bc.emit('start', 'wrongId');
    expect(bc.run).toHaveBeenCalledTimes(0);
    bc.emit('start', 'socketId');
    expect(bc.run).toHaveBeenCalledTimes(1);
    expect(bc2.run).toHaveBeenCalledTimes(1);
});
it('should stop the game for every players', () => {
    const game = new Game_1.default('RoomName');
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards');
    const bc = boards.get('socketId');
    bc.stop = jest.fn().mockImplementation();
    Object.defineProperty(game, 'status', { value: constants_1.GameState.OnGoing, writable: true });
    bc.emit('stop', 'wrongId');
    expect(bc.stop).toHaveBeenCalledTimes(0);
    bc.emit('stop', 'socketId');
    expect(bc.stop).toHaveBeenCalledTimes(1);
    expect(Reflect.get(game, 'status')).toEqual(constants_1.GameState.Opened);
});
it('should execute takeMalus function on malus event', () => {
    const game = new Game_1.default('RoomName');
    const socket = {
        id: 'socketId',
    };
    const socket2 = {
        id: 'socketId2',
    };
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards');
    const bc = boards.get('socketId');
    const bc2 = boards.get('socketId2');
    bc.takeMalus = jest.fn().mockImplementation();
    bc2.takeMalus = jest.fn().mockImplementation();
    bc.emit('malus', 'socketId');
    expect(bc.takeMalus).toHaveBeenCalledTimes(0);
    expect(bc2.takeMalus).toHaveBeenCalledTimes(1);
});
it('should generate new piece on need event', () => {
    const game = new Game_1.default('RoomName');
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards');
    const pieces = Reflect.get(game, 'pieces');
    const bc = boards.get('socketId');
    bc.emit('need', 1);
    expect(pieces.length).toEqual(3);
    bc.emit('need', 1);
    expect(pieces.length).toEqual(6);
    bc.emit('need', 1);
    expect(pieces.length).toEqual(6);
});
it('should clear player/board/listeners reference', () => {
    const game = new Game_1.default('RoomName');
    game.emit = jest.fn().mockImplementation();
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards');
    const bc = boards.get('socketId');
    bc.emit('free', 'socketId');
    expect(boards.has('socketId')).toEqual(false);
    expect(Reflect.has(game, 'pieces')).toEqual(false);
    expect(game.eventNames().length).toEqual(0);
});
it('should clear player/board but keep listener reference', () => {
    const game = new Game_1.default('RoomName');
    game.emit = jest.fn().mockImplementation();
    const socket = {
        id: 'socketId',
    };
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    const socket2 = {
        id: 'socketId2',
    };
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards');
    const bc = boards.get('socketId');
    game.on('test', () => { });
    bc.emit('free', 'socketId');
    expect(boards.has('socketId')).toEqual(false);
    expect(Reflect.has(game, 'pieces')).toEqual(true);
    expect(game.eventNames().length).toEqual(1);
});
