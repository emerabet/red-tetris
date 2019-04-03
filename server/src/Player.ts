import { PlayerType } from './constants';

class Player {
    private uniqueId: string;
    private inRoom: string;
    private role: PlayerType;
    private name: string;

    constructor(id:string, username: string, room: string, role: PlayerType) {
        this.uniqueId = id;
        this.name = username;
        this.inRoom = room;
        this.role = role;
    }

    get id(): string {
        return this.uniqueId;
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

    public setRole(role: PlayerType) {
        this.role = role;
    }
}

export default Player;
