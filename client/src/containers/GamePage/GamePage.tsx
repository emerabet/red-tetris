import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import UseSocket from './UseSocket';
import Home from '../../components/Home';
import Game from '../../components/Game';
import { SpectreI, StateBoardI } from '../../types/gameTypes';
import './style.css';

interface GamePageProps {
  nagivation: any;
  history: any;
  socket: SocketIOClient.Socket;
  started: boolean;
  state: StateBoardI;
  board: number[][];
  startGame: Function;
  endGame: Function;
  resetGame: Function;
  spectres: SpectreI[];
}

const GamePage: React.SFC<GamePageProps> = (props) => {
  const [room, setRoom] = useState('');
  const [player, setPlayer] = useState('');
  const [started, setStarted] = useState(false);
  const [socket, setSocket] = useState(socketIOClient);
  const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);

  useEffect(() => {
    console.log("HASH", window.location.hash);
    if (window.location.hash === '') {
      console.log('test')
      

    } else {
      // var reRoom = /#([a-z A-Z 0-9]*\[)/g;
        var reRoom = /#(.*)\[/g;
      var reUsername = /\[(.*)\]/g;
      var rRoom = reRoom.exec(window.location.hash);
      var rUsername = reUsername.exec(window.location.hash);
      console.log("R", rRoom, rUsername);
      if (rRoom !== null && rUsername !== null) {
        setRoom(rRoom[1]);
        setPlayer(rUsername[1]);
        enterRoom();
      }
    }
  }, []);

  useEffect(
    () => {
      if (props.state.grid && props.state.grid !== undefined) {
        setRow([]);
        for (let i = 0; i < props.state.grid.length; i += 1) {
          let nbEmpty = 0;
          for (let j = 0; j < props.state.grid[i].length; j += 1) {
            if (props.state.grid[i][j] === 0) {
              nbEmpty += 1;
            }
          }
          if (nbEmpty === 0) {
            setRow([...row, i]);
          }
        }
      }
    },
    [props.state.grid]);

  useEffect(
    () => {
      if (started) {
        document.addEventListener('keyup', async (e) => {
          switch (e.key) {
            case 'ArrowLeft':
              socket.emit('left');
              return;
            case 'ArrowRight':
              socket.emit('right');
              return;
            case 'ArrowDown':
              socket.emit('down');
              return;
            case 'ArrowUp':
              socket.emit('up');
              return;
          }
        });
        return function cleanup() {
          document.removeEventListener('keydown', () => { });
        };
      }
    },
    [socket]);

  const enterRoom = async (event: any) => {
    event.preventDefault();
    await props.resetGame();
    await props.startGame(room, player);
    const s = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
      query: {
        room,
        username: player,
      },
    });
    setStarted(true);
    setSocket(s);
    // s.emit('init');
    props.history.push(`/#${room}[${player}]`);
  };

  const enterRoomUrl = async (r: string, p: string) => {
    event.preventDefault();
    await props.resetGame();
    await props.startGame(room, player);
    const s = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
      query: {
        room,
        username: player,
      },
    });
    setStarted(true);
    setSocket(s);
    // s.emit('init');
    props.history.push(`/#${room}[${player}]`);
  };

  function handleChange(event: any) {
    if (event.target.name === 'room') {
      setRoom(event.target.value);
    } else if (event.target.name = 'player') {
      setPlayer(event.target.value);
    }
  }

  const play = () => {
    socket.emit('init');
  };

  return (
    <div>
      {!started
        ?
        <Home
          room={room}
          player={player}
          enterRoom={enterRoom}
          handleChange={handleChange}
        />
        :
        <div>
          <Game
            level={props.state.level}
            score={props.state.score}
            board={props.state.grid}
            row={row}
            room={room}
            player={player}
            spectres={props.spectres}
            pieces={props.state.pieces}
            play={play}
            started={props.started}
          />
          <UseSocket socket={socket} />
        </div>

      }

    </div>
  );
};

export default GamePage;
