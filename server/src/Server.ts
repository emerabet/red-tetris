import express from 'express';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import path from 'path';

import Game from './Game';

class GameServer {
    private app:express.Application;
    private server:http.Server;
    private io:SocketIO.Server;
    private games:Map<string, Game>;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server, { pingTimeout: 60000 });

        this.app.use(cors());

        this.app.use(express.static('public'));

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/test.html'));
        });
    }

    public async start() {
        this.games = new Map<string, Game>();

        this.io.on('connection', (socket:SocketIO.Socket) => {
            const { room, username } = socket.handshake.query;
            if (!this.games.has(room)) {
                const game = new Game(room);
                this.games.set(room, game);
                game.on('free_game', (room) => {
                    this.games.delete(room);
                });
                game.on('update_player_count', (count) => {
                    this.io.in(room).emit('update_player_count', count);
                });
            }
            const game = this.games.get(room) as Game;
            game.createBoard(20, 10, socket, username);
        });

        await this.server.listen(this.port);
        console.log(`listening on *:${this.port}`);
    }

    public gamesCount(): number {
        return this.games.size;
    }

    public async stop() {
        await this.server.close();
        console.log('server closed');
    }
}

export default GameServer;
