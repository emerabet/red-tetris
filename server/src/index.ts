import Game from './Game';
import Player from './Player';

console.log('-------- Début --------');

const game:Game = new Game();
const p1 = new Player('Eric');
const p2 = new Player('Lol');

game.createBoard(p1, 20, 10);
game.createBoard(p2, 20, 10);
console.log(game);
