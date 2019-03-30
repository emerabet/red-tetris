import Game from './../Game';
import BoardController from './../BoardController';
import socketIo from 'socket.io';
import { GameState } from '../constants';

it('create game instance with the rigth name', () => {
    const game: Game = new Game('RoomName');
    expect(game.name).toBe('RoomName');
});

it('create game instance', () => {
    const game: Game = new Game('RoomName');
    expect(game.name).toBeDefined();
});

it('should create a new boardController as Admin in opened Game', () => {
    const game: Game = new Game('RoomName');
    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    expect(socket.join).toHaveBeenCalledTimes(1);
    expect(boards.size).toEqual(1);
});

it('should create a new boardController as player in opened Game', () => {
    const game: Game = new Game('RoomName');
    const socket1:SocketIO.Socket = {
        id: 'socketId1',
    } as SocketIO.Socket;
    const socket2:SocketIO.Socket = {
        id: 'socketId2',
    } as SocketIO.Socket;
    socket1.on = jest.fn().mockImplementation();
    socket1.join = jest.fn().mockImplementation();
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket1, 'playerName1');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    expect(socket1.join).toHaveBeenCalledTimes(1);
    expect(socket2.join).toHaveBeenCalledTimes(1);
    expect(boards.size).toEqual(2);
});

it('should not create a new boardController in not opened Game', () => {
    const game: Game = new Game('RoomName');
    Object.defineProperty(game, 'status', { value: GameState.OnGoing });
    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();
    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    expect(socket.join).toHaveBeenCalledTimes(0);
    expect(boards.size).toEqual(0);
});

it('should start the game for every players', () => {
    const game: Game = new Game('RoomName');
    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();

    const socket2:SocketIO.Socket = {
        id: 'socketId2',
    } as SocketIO.Socket;
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();

    game.createBoard(8, 10, socket, 'playerName');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;

    const bc:BoardController = boards.get('socketId') as BoardController;
    const bc2:BoardController = boards.get('socketId2') as BoardController;
    bc.run = jest.fn().mockImplementation();
    bc2.run = jest.fn().mockImplementation();

    bc.emit('start', 'wrongId');
    expect(bc.run).toHaveBeenCalledTimes(0);
    bc.emit('start', 'socketId');
    expect(bc.run).toHaveBeenCalledTimes(1);
    expect(bc2.run).toHaveBeenCalledTimes(1);
});

it('should stop the game for every players', () => {
    const game: Game = new Game('RoomName');

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();

    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;

    const bc:BoardController = boards.get('socketId') as BoardController;
    bc.stop = jest.fn().mockImplementation();

    Object.defineProperty(game, 'status', { value: GameState.OnGoing });
    bc.emit('stop', 'wrongId');
    expect(bc.stop).toHaveBeenCalledTimes(0);
    bc.emit('stop', 'socketId');
    expect(bc.stop).toHaveBeenCalledTimes(1);
});

it('should execute takeMalus function on malus event', () => {
    const game: Game = new Game('RoomName');

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;

    const socket2:SocketIO.Socket = {
        id: 'socketId2',
    } as SocketIO.Socket;
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();

    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();

    game.createBoard(8, 10, socket, 'playerName');
    game.createBoard(8, 10, socket2, 'playerName2');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;

    const bc:BoardController = boards.get('socketId') as BoardController;
    const bc2:BoardController = boards.get('socketId2') as BoardController;
    bc.takeMalus = jest.fn().mockImplementation();
    bc2.takeMalus = jest.fn().mockImplementation();

    bc.emit('malus', 'socketId');
    expect(bc.takeMalus).toHaveBeenCalledTimes(0);
    expect(bc2.takeMalus).toHaveBeenCalledTimes(1);
});

it('should generate new piece on need event', () => {
    const game: Game = new Game('RoomName');

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();

    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    const pieces = Reflect.get(game, 'pieces') as [];
    const bc:BoardController = boards.get('socketId') as BoardController;

    bc.emit('need', 1);
    expect(pieces.length).toEqual(3);
    bc.emit('need', 1);
    expect(pieces.length).toEqual(6);
    bc.emit('need', 1);
    expect(pieces.length).toEqual(6);
});

it('should clear player/board/listeners reference', () => {
    const game: Game = new Game('RoomName');
    game.emit = jest.fn().mockImplementation();
    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();

    game.createBoard(8, 10, socket, 'playerName');
    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    const bc:BoardController = boards.get('socketId') as BoardController;
    game.on('test', () => { });
    bc.emit('free', 'socketId');
    expect(boards.has('socketId')).toEqual(false);
    expect(Reflect.has(game, 'pieces')).toEqual(false);
    expect(game.emit).toHaveBeenCalledTimes(1);
    expect(game.eventNames().length).toEqual(0);
});

it('should clear player/board but keep listener reference', () => {
    const game: Game = new Game('RoomName');
    game.emit = jest.fn().mockImplementation();
    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.join = jest.fn().mockImplementation();

    const socket2:SocketIO.Socket = {
        id: 'socketId2',
    } as SocketIO.Socket;
    socket2.on = jest.fn().mockImplementation();
    socket2.join = jest.fn().mockImplementation();

    game.createBoard(8, 10, socket, 'playerName');
    game.createBoard(8, 10, socket2, 'playerName2');

    const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    const bc:BoardController = boards.get('socketId') as BoardController;

    game.on('test', () => { });
    bc.emit('free', 'socketId');

    expect(boards.has('socketId')).toEqual(false);
    expect(Reflect.has(game, 'pieces')).toEqual(true);
    expect(game.emit).toHaveBeenCalledTimes(0);
    expect(game.eventNames().length).toEqual(1);
});
