"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Player {
    constructor(name, room, role) {
        this.name = name;
        this.inRoom = room;
        this.role = role;
    }
    get username() {
        return this.name;
    }
    get room() {
        return this.inRoom;
    }
    get isAdmin() {
        return (this.role === constants_1.PlayerType.Admin);
    }
}
exports.default = Player;
