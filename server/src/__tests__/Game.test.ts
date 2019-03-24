import Game from './../Game';

it('create game instance', () => {
    const game: Game = new Game('RoomName');
    expect(game.name).toBe('RoomName');
});
