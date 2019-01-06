"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./Game"));
const Player_1 = __importDefault(require("./Player"));
console.log('-------- Début --------');
const game = new Game_1.default();
const p1 = new Player_1.default('Eric');
const p2 = new Player_1.default('Lol');
game.createBoard(p1, 20, 10);
game.createBoard(p2, 20, 10);
// console.log(game);
// console.log(game.getBoards()[0].board);
// console.log(game.getBoards()[0].player);
game.getBoards()[0].run();
// game.getBoards()[1].run();
