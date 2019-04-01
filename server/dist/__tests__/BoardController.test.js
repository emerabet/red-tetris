"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const Server_1 = __importDefault(require("./../Server"));
const BoardController_1 = __importDefault(require("./../BoardController"));
const Player_1 = __importDefault(require("./../Player"));
const constants_1 = require("./../constants");
const Board_1 = __importDefault(require("./../Board"));
const PieceFactory_1 = __importDefault(require("../PieceFactory"));
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
    jest.useFakeTimers();
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
it('should not add locked row to the board', () => {
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    ];
    Object.defineProperty(board, 'playfield', { value: mock });
    const boardController = new BoardController_1.default(player, board, socket, pieces);
    Object.defineProperty(boardController, 'currentPiece', {
        value: PieceFactory_1.default.createPiece('O'),
    });
    Object.defineProperty(boardController, 'isFinished', {
        value: true,
    });
    boardController.takeMalus();
    board.fill(Reflect.get(boardController, 'currentPiece'));
    expect(Reflect.get(board, 'playfield')).toEqual(expected);
});
describe('socket init', () => {
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets init', () => {
        it('init', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets stop', () => {
        it('stop', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets restart', () => {
        it('restart', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets down', () => {
        it('down', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('O');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets rotate', () => {
        it('rotate', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('Z');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('rotate', () => {
        it('should not rotate', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('O');
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
            const board = new Board_1.default(2, 10);
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        // start the io server
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            // connect two io clients
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
        // disconnect io clients after each test
        sender.disconnect();
        done();
    });
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets left', () => {
        it('left', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('O');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        // start the io server
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            // connect two io clients
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
        // disconnect io clients after each test
        sender.disconnect();
        done();
    });
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets right', () => {
        it('right', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('O');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        // start the io server
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            // connect two io clients
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test sockets disconnect', () => {
        it('disconnect', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
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
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        // start the io server
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            // connect two io clients
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test check line', () => {
        it('should remove line', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('O');
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
            const board = new Board_1.default(3, 10);
            Object.defineProperty(board, 'playfield', { value: mock });
            Object.defineProperty(bc, 'currentBoard', { value: board });
            const spy = jest.spyOn(bc, 'emit');
            sender.emit('down');
            s.on('down', () => {
                expect(spy).toHaveBeenCalledTimes(2);
                done();
            });
        });
    });
});
describe('isFinished', () => {
    let sender;
    const ser = new Server_1.default(4000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        // start the io server
        yield ser.start();
        done();
    }));
    beforeEach((done) => {
        if (ser.gamesCount() === 0) {
            // connect two io clients
            sender = socket_io_client_1.default('http://localhost:4000/', {
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
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    describe('test execute if isFinished is true', () => {
        it('should not execute action', (done) => {
            const gams = Reflect.get(ser, 'games');
            const g = gams.values().next().value;
            const b = Reflect.get(g, 'boards');
            const bc = b.values().next().value;
            const s = Reflect.get(bc, 'socket');
            const p = PieceFactory_1.default.createPiece('O');
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
