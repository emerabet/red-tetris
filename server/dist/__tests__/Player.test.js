"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./../Player"));
const constants_1 = require("./../constants");
it('create Player instance', () => {
    const player = new Player_1.default('totoId', 'pseudo', 'la room', constants_1.PlayerType.Admin);
    expect(player.id).toBeDefined();
    expect(player.username).toBeDefined();
    expect(player.room).toBeDefined();
});
it('should return true to isAdmin', () => {
    const player = new Player_1.default('totoId', 'pseudo', 'la room', constants_1.PlayerType.Admin);
    expect(player.isAdmin).toEqual(true);
});
it('should return false to isAdmin', () => {
    const player = new Player_1.default('totoId', 'pseudo', 'la room', constants_1.PlayerType.Player);
    expect(player.isAdmin).toEqual(false);
});
