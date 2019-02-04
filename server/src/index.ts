import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import path from 'path';

import Game from './Game';
import { EventEmitter } from 'events';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { pingTimeout: 60000 });

app.use(cors());

const games = new Map<string, Game>();
// const game:Game = new Game();
// const p1 = new Player('Eric');
// const p2 = new Player('Lol');

io.on('connection', (socket:SocketIO.Socket) => {
    const { room, pseudo } = socket.handshake.query;
    if (!games.has(room)) {
        console.log('Game created: ', room);
        const eventGame = new EventEmitter();
        games.set(room, new Game(room, eventGame));
        init(eventGame);
    }
    const game = games.get(room);
    if (game) {
        console.log('Player added: ', socket.id);
        game.createBoard(20, 10, socket);
    }
});

function init(eventGame: EventEmitter) {
    eventGame.on('freeGame', (room) => {
        games.delete(room);
        eventGame.removeAllListeners();
        console.log('in free game:: ', room);
        console.log(games.get(room));
        console.log('games: ', games);
    });
}

server.listen(4000, () => {
    console.log('listening on *:4000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/test.html'));
});

console.log('-------- Début --------');
