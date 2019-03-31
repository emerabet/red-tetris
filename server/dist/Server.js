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
class GameServer {
    constructor() {
        this.app = express_1.default();
        this.server = http_1.default.createServer(this.app);
        this.io = socket_io_1.default(this.server, { pingTimeout: 60000 });
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static('public'));
        this.app.get('/', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../public/test.html'));
        });
    }
    start() {
        this.games = new Map();
        this.io.on('connection', (socket) => {
            const { room, username } = socket.handshake.query;
            if (!this.games.has(room)) {
                const game = new Game_1.default(room);
                this.games.set(room, game);
                game.on('freeGame', (room) => {
                    this.games.delete(room);
                });
            }
            const game = this.games.get(room);
            if (game) {
                game.createBoard(20, 10, socket, username);
            }
        });
        this.server.listen(4000, () => {
            console.log('listening on *:4000');
        });
    }
}
exports.default = GameServer;
//const app = express();
//const server = http.createServer(app);
//const io = socketIo(server, { pingTimeout: 60000 });
// app.use(cors());
//const games = new Map<string, Game>();
// io.on('connection', (socket:SocketIO.Socket) => {
//     const { room, username } = socket.handshake.query;
//     if (!games.has(room)) {
//         const game = new Game(room);
//         games.set(room, game);
//         initListeners(game);
//     }
//     const game = games.get(room);
//     if (game) {
//         game.createBoard(20, 10, socket, username);
//     }
// });
// function initListeners(game: Game) {
//     game.on('freeGame', (room) => {
//         games.delete(room);
//     });
// }
// server.listen(4000, () => {
//     console.log('listening on *:4000');
// });
// app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/test.html'));
// });
