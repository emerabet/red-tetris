"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const path_1 = __importDefault(require("path"));
const Game_1 = __importDefault(require("./Game"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server, { pingTimeout: 60000 });
app.use(cors_1.default());
const games = new Map();
io.on('connection', (socket) => {
    const { room, pseudo } = socket.handshake.query;
    if (!games.has(room)) {
        console.log('Game created: ', room);
        const game = new Game_1.default(room);
        games.set(room, game);
        initListeners(game);
    }
    const game = games.get(room);
    if (game) {
        console.log('Player added: ', socket.id);
        game.createBoard(20, 10, socket);
    }
});
function initListeners(game) {
    game.on('freeGame', (room) => {
        games.delete(room);
        console.log('in free game:: ', room);
        console.log(games.get(room));
        console.log('games: ', games);
    });
}
server.listen(4000, () => {
    console.log('listening on *:4000');
});
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/test.html'));
});
console.log('-------- Début --------');
