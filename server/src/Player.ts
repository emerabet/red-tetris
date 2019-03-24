import { PlayerType } from './constants';

class Player {
    private name: string;
    private inRoom: string;
    private role: PlayerType;

    constructor(name:string, room: string, role: PlayerType) {
        this.name = name;
        this.inRoom = room;
        this.role = role;
    }

    get username(): string {
        return this.name;
    }

    get room(): string {
        return this.inRoom;
    }

    get isAdmin(): boolean {
        return (this.role === PlayerType.Admin);
    }
}

export default Player;
