import io from 'socket.io-client';
import request from 'supertest';
import http from 'http';
import GameServer from './../Server';

describe('Server', () => {
    let player1:SocketIOClient.Socket;
    let player2:SocketIOClient.Socket;
    const ser = new GameServer(5000);

    beforeAll(async (done) => {
        await ser.start();
        done();
    });

    afterAll(async (done) => {
        await ser.stop();
        done();
    });

    beforeEach((done) => {
        player1 = io('http://localhost:5000/', {
            query: {
                room: 'theroom',
                username: 'player1',
            },
        });
        player1.on('connect', () => {
            done();
        });
    });

    afterEach((done) => {
        player1.disconnect();
        done();
    });

    describe('ttttt', () => {
        beforeEach((done) => {
            player2 = io('http://localhost:5000/', {
                query: {
                    room: 'theroom',
                    username: 'player2',
                },
            });
            player2.on('connect', () => {
                done();
            });
        });

        afterEach((done) => {
            player2.disconnect();
            done();
        });
        it('Test server', async () => {
            const server = Reflect.get(ser, 'server') as http.Server;
            const result = await request(server).get('/');
            expect(result.ok).toEqual(true);
            expect(ser.gamesCount()).toEqual(1);
        });
    });
});
