"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { pingTimeout: 60000 });
const path = require('path');
const crypto = require('crypto');
const Game_1 = __importDefault(require("./Game"));
const Player_1 = __importDefault(require("./Player"));
app.use(cors());
const games = new Map();
// const game:Game = new Game();
// const p1 = new Player('Eric');
// const p2 = new Player('Lol');
io.on('connection', (socket) => {
    const { room, pseudo } = socket.handshake.query;
    if (!games.has(room)) {
        console.log('Game created: ', room);
        games.set(room, new Game_1.default());
    }
    const game = games.get(room);
    if (game) {
        console.log('Player added: ', socket.id);
        game.createBoard(new Player_1.default(socket.id), 20, 10, socket);
    }
});
io.on('', (socket) => {
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
