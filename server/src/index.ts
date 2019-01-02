import Game from './Game';
import Player from './Player';

console.log('-------- Début --------');

const game:Game = new Game();
const p1 = new Player('Eric');
const p2 = new Player('Lol');

game.createBoard(p1, 20, 10);
game.createBoard(p2, 20, 10);
// console.log(game);

// console.log(game.getBoards()[0].board);
// console.log(game.getBoards()[0].player);

game.getBoards()[0].run();
game.getBoards()[1].run();
