const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import Game from './Game';
import Player from './Player';

app.use(cors());

const game:Game = new Game();
const p1 = new Player('Eric');
const p2 = new Player('Lol');

io.on('connection', (socket:any) => {
    console.log('Game created');
    game.createBoard(p1, 20, 10, socket);
});

http.listen(4000, () => {
    console.log('listening on *:4000');
});

app.get('/', (req, res) => {
    console.log('Req from web');
    res.send('<h1>Hello world</h1>');
});

console.log('-------- Début --------');

// game.createBoard(p1, 20, 10);
// game.createBoard(p2, 20, 10);
// console.log(game);

// console.log(game.getBoards()[0].board);
// console.log(game.getBoards()[0].player);

// game.getBoards()[0].run();
// game.getBoards()[1].run();
