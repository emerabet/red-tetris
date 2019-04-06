import io from 'socket.io-client';
import GameServer from './../Server';
import BoardController from './../BoardController';
import Player from './../Player';
import { PlayerType, IPlayerInfo, GameState, GameMode } from './../constants';
import Board from './../Board';
import PieceFactory from '../PieceFactory';
import Game from '../Game';

const port:number = parseInt(<string>process.env.PORT, 10) || 4000;

it('should create a boardController instance', () => {
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(8, 10);

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();

    const boardController = new BoardController(player, board, socket, pieces);

    expect(boardController).toBeDefined();
});

it('should return IPlayerInfo object', () => {
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(8, 10);

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();

    const boardController = new BoardController(player, board, socket, pieces);

    expect(boardController.getPlayerInfo().username).toEqual(player.username);
    expect(boardController.getPlayerInfo().id).toEqual(socket.id);
});

it('should run the game loop', () => {
    jest.useFakeTimers();
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(8, 10);

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.emit = jest.fn().mockImplementation();
    socket.to = jest.fn().mockImplementation(() => {
        return {
            emit: () => null,
        };
    });

    const boardController = new BoardController(player, board, socket, pieces);
    boardController.run();
    jest.runAllTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(Reflect.get(boardController, 'timer')).toBeTruthy();
});

it('should stop the game loop in loosing position', () => {
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(3, 10);

    const mock1 = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const mock2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.emit = jest.fn().mockImplementation();
    socket.to = jest.fn().mockImplementation(() => {
        return {
            emit: () => null,
        };
    });

    const boardController = new BoardController(player, board, socket, pieces);
    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory.createPiece('O'),
    });
    Object.defineProperty(board, 'playfield', { value: mock1, writable: true });
    boardController.stop();
    jest.runAllTimers();
    expect(Reflect.get(boardController, 'timer')).toBeFalsy();
    expect(board.grid).toEqual(mock2);
});

it('should stop the game loop in winning position', () => {
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(3, 10);

    const mock1 = [
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
    socket.on = jest.fn().mockImplementation();
    socket.emit = jest.fn().mockImplementation();
    socket.to = jest.fn().mockImplementation(() => {
        return {
            emit: () => null,
        };
    });

    const boardController = new BoardController(player, board, socket, pieces);
    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory.createPiece('O'),
    });
    Object.defineProperty(board, 'playfield', { value: mock1, writable: true });
    boardController.stop(true);
    jest.runAllTimers();
    expect(Reflect.get(boardController, 'timer')).toBeFalsy();
    expect(board.grid).toEqual(mock1);
});

it('should add locked row to the board', () => {
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(8, 10);

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
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

    const boardController = new BoardController(player, board, socket, pieces);

    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory.createPiece('O'),
    });

    boardController.takeMalus();
    board.fill(Reflect.get(boardController, 'currentPiece'));

    expect(Reflect.get(board, 'playfield')).toEqual(expected);
});

it('should not add locked row to the board', () => {
    const player = new Player('socketId',
                              'playerName',
                              'roomName',
                              PlayerType.Admin);

    const board = new Board(8, 10);

    const pieces = [] as string[];

    const socket:SocketIO.Socket = {
        id: 'socketId',
    } as SocketIO.Socket;
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    ];
    Object.defineProperty(board, 'playfield', { value: mock });

    const boardController = new BoardController(player, board, socket, pieces);

    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory.createPiece('O'),
    });

    Object.defineProperty(boardController, 'isFinished', {
        value: true,
    });

    boardController.takeMalus();
    board.fill(Reflect.get(boardController, 'currentPiece'));

    expect(Reflect.get(board, 'playfield')).toEqual(expected);
});

describe('socket init', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets init', () => {
        it('init', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const spy = jest.spyOn(bc, 'emit');

            sender.emit('init');
            s.on('init', () => {
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });
});

describe('socket stop', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets stop', () => {
        it('stop', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const spy = jest.spyOn(bc, 'emit');

            sender.emit('stop');
            s.on('stop', () => {
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });
});

describe('socket restart', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets restart', () => {
        it('restart', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const spy = jest.spyOn(bc, 'emit');

            sender.emit('restart');
            s.on('restart', () => {
                expect(spy).toHaveBeenCalledTimes(2);
                done();
            });
        });
    });
});

describe('socket down', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets down', () => {
        it('down', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('O');
            Object.defineProperty(bc, 'currentPiece', {
                value: p,
            });
            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });
            const save = p.row;
            sender.emit('down');
            s.on('down', () => {
                expect(save).toBeLessThan(p.row);
                done();
            });
        });
    });
});

describe('socket rotate', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets rotate', () => {
        it('rotate', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('Z');

            Object.defineProperty(bc, 'currentPiece', {
                value: p,
            });
            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });
            const save = p.shape;
            sender.emit('up');
            s.on('up', () => {
                expect(save).not.toEqual(p.shape);
                done();
            });
        });
    });
});

describe('check wrong rotate', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('rotate', () => {
        it('should not rotate', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('O');

            Object.defineProperty(bc, 'currentPiece', {
                value: p,
                writable: true,
            });

            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });

            const mock = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ];

            const board = new Board(2, 10);
            Object.defineProperty(board, 'playfield', { value: mock });

            Object.defineProperty(bc, 'currentBoard', { value: board });

            const spy = jest.spyOn(p, 'rollback');

            sender.emit('up');
            s.on('up', () => {
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });
});

describe('socket left', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets left', () => {
        it('left', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('O');
            Object.defineProperty(bc, 'currentPiece', {
                value: p,
            });
            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });
            const save = p.col;
            sender.emit('left');
            s.on('left', () => {
                expect(save).toBeGreaterThan(p.col);
                done();
            });
        });
    });
});

describe('socket right', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets right', () => {
        it('right', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('O');
            Object.defineProperty(bc, 'currentPiece', {
                value: p,
            });
            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });
            const save = p.col;
            sender.emit('right');
            s.on('right', () => {
                expect(save).toBeLessThan(p.col);
                done();
            });
        });
    });
});

describe('socket disconnect', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test sockets disconnect', () => {
        it('disconnect', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;
            const t = Reflect.get(bc, 'timer');

            sender.disconnect();
            s.on('disconnect', () => {
                expect(t).toEqual(null);
                expect(g.eventNames().length).toEqual(0);
                expect(bc.eventNames().length).toEqual(0);
                expect(s.rooms).toEqual({});
                expect(s.eventNames().length).toEqual(0);
                done();
            });
        });
    });
});

describe('check line', () => {
    let sender:SocketIOClient.Socket;
    const ser =  new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test check line', () => {
        it('should remove line', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('O');

            Object.defineProperty(bc, 'currentPiece', {
                value: p,
                writable: true,
            });

            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });

            const mock = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ];

            const board = new Board(3, 10);
            Object.defineProperty(board, 'playfield', { value: mock, writable: true });

            Object.defineProperty(bc, 'currentBoard', { value: board });

            const spy = jest.spyOn(bc, 'emit');

            sender.emit('down');
            s.on('down', () => {
                expect(spy).toHaveBeenCalledTimes(3);
                done();
            });
        });
    });
});

describe('isFinished', () => {
    let sender:SocketIOClient.Socket;
    const ser = new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = io(`http://localhost:${port}/`, {
                transports: ['websocket'],
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!sender.connected) {
                sender.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        sender.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test execute if isFinished is true', () => {
        it('should not execute action', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;
            const g = gams.values().next().value as Game;

            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value as BoardController;
            const s = Reflect.get(bc, 'socket') as SocketIO.Socket;

            const p = PieceFactory.createPiece('O');
            Object.defineProperty(bc, 'currentPiece', {
                value: p,
            });
            Object.defineProperty(bc, 'isFinished', {
                value: true,
            });
            Object.defineProperty(bc, 'freeBoard', {
                value: jest.fn().mockImplementation(),
            });
            const save = p.col;
            sender.emit('right');
            s.on('right', () => {
                expect(save).toEqual(p.col);
                done();
            });
        });
    });
});

describe('assignNewAdministrator', () => {
    let player1:SocketIOClient.Socket;
    let player2:SocketIOClient.Socket;
    const ser = new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            player1 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!player1.connected) {
                player1.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        player1.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test admin change', () => {
        beforeEach((done) => {
            player2 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player2',
                },
            });
            player2.on('connect', () => {
                done();
            });
        });

        afterEach((done) => {
            player2.disconnect();
            done();
        });

        it('should set second player as admin', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;

            player1.disconnect();

            const g = gams.values().next().value as Game;
            const b = Reflect.get(g, 'boards') as Map<string, BoardController>;

            const iterator: IterableIterator<BoardController> = b.values();

            const bc1 = iterator.next().value;
            const bc2 = iterator.next().value;

            const s1 = Reflect.get(bc1, 'socket') as SocketIO.Socket;

            s1.on('disconnect', () => {
                const p = Reflect.get(bc2, 'currentPlayer') as Player;
                expect(p.isAdmin).toEqual(true);
                done();
            });
        });
    });
});

describe('checkWinner', () => {
    let player1:SocketIOClient.Socket;
    let player2:SocketIOClient.Socket;
    const ser = new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            player1 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!player1.connected) {
                player1.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        player1.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test detect winner', () => {
        beforeEach((done) => {
            player2 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player2',
                },
            });
            player2.on('connect', () => {
                done();
            });
        });

        afterEach((done) => {
            player2.disconnect();
            done();
        });

        it('should detect a winner in multiplayer party', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;

            player1.disconnect();

            const g = gams.values().next().value as Game;
            const b = Reflect.get(g, 'boards') as Map<string, BoardController>;

            const iterator: IterableIterator<BoardController> = b.values();

            const bc1 = iterator.next().value;
            const bc2 = iterator.next().value;

            const p = PieceFactory.createPiece('O');

            Object.defineProperty(g, 'status', { value: GameState.OnGoing });
            Object.defineProperty(g, 'mode', { value: GameMode.Multiplyaer });
            Object.defineProperty(bc2, 'currentPiece', { value: p });

            const s1 = Reflect.get(bc1, 'socket') as SocketIO.Socket;

            s1.on('disconnect', () => {
                expect(bc2.getIsFinished()).toEqual(true);
                done();
            });
        });
    });
});

describe('checkWinner', () => {
    let player1:SocketIOClient.Socket;
    const ser = new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            player1 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!player1.connected) {
                player1.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        player1.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test winner detection on solo game', () => {
        it('should detect a winner in solo party', (done) => {
            const gams = Reflect.get(ser, 'games') as Map<string, Game>;

            const g = gams.values().next().value as Game;
            const b = Reflect.get(g, 'boards') as Map<string, BoardController>;

            const iterator: IterableIterator<BoardController> = b.values();

            const bc1 = iterator.next().value;

            Object.defineProperty(g, 'status', { value: GameState.OnGoing });
            Object.defineProperty(bc1, 'isFinished', { value: false, writable: true });

            bc1.on('game_over', () => {
                expect(bc1.getIsFinished()).toEqual(false);
                done();
            });
            bc1.emit('game_over', 'player1');
        });
    });
});

describe('checkWinner', () => {
    let player1:SocketIOClient.Socket;
    let player2:SocketIOClient.Socket;
    let player3:SocketIOClient.Socket;
    const ser = new GameServer(port);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            player1 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player1',
                },
            });
            if (!player1.connected) {
                player1.on('connect', () => {
                    done();
                });
            }
        }
    });

    afterEach((done) => {
        player1.disconnect();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    describe('test detect winner', () => {
        beforeEach((done) => {
            player2 = io(`http://localhost:${port}/`, {
                query: {
                    room: 'theroom',
                    username: 'player2',
                },
            });
            player2.on('connect', () => {
                done();
            });
        });

        afterEach((done) => {
            player2.disconnect();
            done();
        });

        describe('player 3', () => {
            beforeEach((done) => {
                player3 = io(`http://localhost:${port}/`, {
                    query: {
                        room: 'theroom',
                        username: 'player3',
                    },
                });
                player3.on('connect', () => {
                    done();
                });
            });

            afterEach((done) => {
                player3.disconnect();
                done();
            });

            it('should detect there is no winner yet', (done) => {
                const gams = Reflect.get(ser, 'games') as Map<string, Game>;

                player1.disconnect();

                const g = gams.values().next().value as Game;
                const b = Reflect.get(g, 'boards') as Map<string, BoardController>;

                const iterator: IterableIterator<BoardController> = b.values();

                const bc1 = iterator.next().value;
                const bc2 = iterator.next().value;
                const bc3 = iterator.next().value;

                const p = PieceFactory.createPiece('O');

                Object.defineProperty(g, 'status', { value: GameState.OnGoing });
                Object.defineProperty(g, 'mode', { value: GameMode.Multiplyaer });
                Object.defineProperty(bc1, 'isFinished', { value: true, writable: true });
                Object.defineProperty(bc2, 'isFinished', { value: false, writable: true });
                Object.defineProperty(bc3, 'isFinished', { value: false, writable: true });

                const s1 = Reflect.get(bc1, 'socket') as SocketIO.Socket;

                bc1.on('game_over', () => {
                    expect(bc2.getIsFinished()).toEqual(false);
                    expect(bc3.getIsFinished()).toEqual(false);
                    done();
                });
                bc1.emit('game_over', 'player1');
            });
        });
    });
});
