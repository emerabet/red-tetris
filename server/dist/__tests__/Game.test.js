"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./../Game"));
it('create game instance with the rigth name', () => {
    const game = new Game_1.default('RoomName');
    expect(game.name).toBe('RoomName');
});
it('create game instance', () => {
    const game = new Game_1.default('RoomName');
    expect(game.name).toBeDefined();
});
// it('game instance extends eventemitter', () => {
//     const game: Game = new Game('RoomName');
//     const socket:SocketIO.Socket = {
//         id: 'socketId',
//     } as SocketIO.Socket;
//     socket.on = jest.fn().mockImplementation();
//     game.createBoard(20, 10, socket, 'toto');
// });
