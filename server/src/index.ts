import GameServer from './Server';

const port:number = parseInt(<string>process.env.PORT, 10) || 4000;
const server = new GameServer(port);
server.start();
