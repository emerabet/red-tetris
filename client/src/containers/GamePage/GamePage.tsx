import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import UseSocket from './UseSocket';
import Home from '../../components/Home';
import Game from '../../components/Game';
import { OponentInterface, StateBoardI } from '../../types/gameTypes';
import './style.css';

interface GamePageProps {
  nagivation: any;
  history: any;
  socket: SocketIOClient.Socket;
  /*started: boolean;*/
  state: StateBoardI;
  board: number[][];
  startGame: Function;
  endGame: Function;
  resetGame: Function;
  oponents: OponentInterface[];
  status: string;
}

const GamePage: React.SFC<GamePageProps> = (props) => {
  const [room, setRoom] = useState('');
  const [player, setPlayer] = useState('');
  const [started, setStarted] = useState(false);
  const [socket, setSocket] = useState(socketIOClient);
  const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);

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

  const play = async (event: any) => {
    event.preventDefault();
    await props.resetGame();
    await props.startGame(room, player);
    const s = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
      query: {
        room,
        pseudo: player,
      },
    });
    setStarted(true);
    setSocket(s);
    s.emit('init');
    props.history.push(`/#${room}[${player}]`);
  };

  function handleChange(event: any) {
    if (event.target.name === 'room') {
      setRoom(event.target.value);
    } else if (event.target.name = 'player') {
      setPlayer(event.target.value);
    }
  }

  return (
    <div>
      {console.log('sdfsdg', props.state)}
      {!started
        ?
        <Home
          room={room}
          player={player}
          play={play}
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
            oponents={props.oponents}
            status={props.status}
            pieces={props.state.pieces}
          />
          <UseSocket socket={socket} />
        </div>

      }

    </div>
  );
};

export default GamePage;
