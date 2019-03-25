import Game from './../Game';
import socketIo from 'socket.io';

it('create game instance with the rigth name', () => {
    const game: Game = new Game('RoomName');
    expect(game.name).toBe('RoomName');
});

it('create game instance', () => {
    const game: Game = new Game('RoomName');
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
