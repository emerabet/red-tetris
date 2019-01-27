const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { pingTimeout: 60000 });
const path = require('path');
const crypto = require('crypto');

import Game from './Game';
import Player from './Player';
import { Socket } from 'socket.io';

app.use(cors());

const games = new Map<string, Game>();
// const game:Game = new Game();
// const p1 = new Player('Eric');
// const p2 = new Player('Lol');

io.on('connection', (socket:Socket) => {
    const { room, pseudo } = socket.handshake.query;

    if (!games.has(room)) {
        console.log('Game created: ', room);
        games.set(room, new Game());
    }
    const game = games.get(room);
    if (game) {
        console.log('Player added: ', socket.id);
        game.createBoard(new Player(socket.id), 20, 10, socket);
    }
});

io.on('', (socket:Socket) => {

});

http.listen(4000, () => {
    console.log('listening on *:4000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/test.html'));
});

console.log('-------- Début --------');

// game.createBoard(p1, 20, 10);
// game.createBoard(p2, 20, 10);
// console.log(game);

// console.log(game.getBoards()[0].board);
// console.log(game.getBoards()[0].player);

// game.getBoards()[0].run();
// game.getBoards()[1].run();
