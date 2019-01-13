"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game_1 = __importDefault(require("./Game"));
const Player_1 = __importDefault(require("./Player"));
app.use(cors());
const game = new Game_1.default();
const p1 = new Player_1.default('Eric');
const p2 = new Player_1.default('Lol');
io.on('connection', (socket) => {
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
