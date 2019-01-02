class Player {
    private name: string;

    constructor(name:string) {
        this.name = name;
    }

    get username(): String {
        return this.name;
    }
}

export default Player;
