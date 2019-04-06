import Player from './../Player';
import { PlayerType } from './../constants';

it('create Player instance', () => {
    const player: Player = new Player('totoId', 'pseudo', 'la room', PlayerType.Admin);
    expect(player.id).toBeDefined();
    expect(player.username).toBeDefined();
    expect(player.room).toBeDefined();
    expect(player.username).toEqual('pseudo');
});

it('should return true to isAdmin', () => {
    const player: Player = new Player('totoId', 'pseudo', 'la room', PlayerType.Admin);
    expect(player.isAdmin).toEqual(true);
});

it('should return false to isAdmin', () => {
    const player: Player = new Player('totoId', 'pseudo', 'la room', PlayerType.Player);
    expect(player.isAdmin).toEqual(false);
});

it('should set the new role correctly', () => {
    const player: Player = new Player('totoId', 'pseudo', 'la room', PlayerType.Player);
    player.setRole(PlayerType.Admin);
    expect(player.isAdmin).toEqual(true);
});
