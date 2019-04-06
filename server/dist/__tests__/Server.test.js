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
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const supertest_1 = __importDefault(require("supertest"));
const Server_1 = __importDefault(require("./../Server"));
describe('Server', () => {
    let player1;
    let player2;
    const ser = new Server_1.default(5000);
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.start();
        done();
    }));
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield ser.stop();
        done();
    }));
    beforeEach((done) => {
        player1 = socket_io_client_1.default('http://localhost:5000/', {
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
            player2 = socket_io_client_1.default('http://localhost:5000/', {
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
        it('Test server', () => __awaiter(this, void 0, void 0, function* () {
            const server = Reflect.get(ser, 'server');
            const result = yield supertest_1.default(server).get('/');
            expect(result.ok).toEqual(true);
            expect(ser.gamesCount()).toEqual(1);
        }));
    });
});
