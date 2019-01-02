"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name) {
        this.name = name;
    }
    get username() {
        return this.name;
    }
}
exports.default = Player;
