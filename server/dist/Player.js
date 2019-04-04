"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Player {
    constructor(id, username, room, role) {
        this.uniqueId = id;
        this.name = username;
        this.inRoom = room;
        this.role = role;
    }
    get id() {
        return this.uniqueId;
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
    setRole(role) {
        this.role = role;
    }
}
exports.default = Player;
