"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const Game_1 = __importDefault(require("./Game"));
class GameServer {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.server = http_1.default.createServer(this.app);
        this.io = socket_io_1.default(this.server, { pingTimeout: 60000 });
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static('build'));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.games = new Map();
            this.io.on('connection', (socket) => {
                const { room, username } = socket.handshake.query;
                if (!this.games.has(room)) {
                    const game = new Game_1.default(room);
                    this.games.set(room, game);
                    game.on('free_game', (room) => {
                        this.games.delete(room);
                    });
                    game.on('update_game_state', ({ count, username, action, id }) => {
                        this.io.in(room).emit('update_game_state', count, username, action, id);
                    });
                }
                const game = this.games.get(room);
                game.createBoard(20, 10, socket, username);
            });
            yield this.server.listen(this.port);
            console.log(`listening on *:${this.port}`);
        });
    }
    gamesCount() {
        return this.games.size;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.close();
            console.log('server closed');
        });
    }
}
exports.default = GameServer;
