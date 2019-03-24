import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import path from 'path';

import Game from './Game';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { pingTimeout: 60000 });

app.use(cors());

const games = new Map<string, Game>();

io.on('connection', (socket:SocketIO.Socket) => {
    const { room, username } = socket.handshake.query;
    if (!games.has(room)) {
        const game = new Game(room);
        games.set(room, game);
        initListeners(game);
    }
    const game = games.get(room);
    if (game) {
        game.createBoard(20, 10, socket, username);
    }
});

function initListeners(game: Game) {
    game.on('freeGame', (room) => {
        games.delete(room);
    });
}

server.listen(4000, () => {
    console.log('listening on *:4000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/test.html'));
});
