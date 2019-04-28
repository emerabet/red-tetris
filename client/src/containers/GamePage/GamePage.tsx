import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import UseSocket from './UseSocket';
import Home from '../../components/Home';
import Game from '../../components/Game';
import { SpectreI, StateBoardI } from '../../types/gameTypes';
import './style.css';
import socketUrl from '../../config/default';

interface GamePageProps {
  nagivation: any;
  history: any;
  started: boolean;
  state: StateBoardI;
  startGame: Function;
  endGame: Function;
  resetGame: Function;
  spectres: SpectreI[];
  count: number;
  username: string;
  action: string;
  updatePlayers: Function;
}

const GamePage: React.SFC<GamePageProps> = (props) => {
  const [room, setRoom] = useState('');
  const [player, setPlayer] = useState('');
  const [started, setStarted] = useState(false);
  const [socket, setSocket] = useState<null | SocketIOClient.Socket>(null);
  const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);

  useEffect(
    () => {
      const t = setTimeout(() => props.updatePlayers(props.count, '', '', ''), 2000);
      return function cleanUp() {
        clearTimeout(t);
      };
    },
    [props.username, props.action]);

  useEffect(
    () => {
      if (window.location.hash !== '') {
        const reRoom = /#(.*)\[/g;
        const reUsername = /\[(.*)\]/g;
        const rRoom = reRoom.exec(window.location.hash);
        const rUsername = reUsername.exec(window.location.hash);
        if (rRoom !== null && rUsername !== null) {
          setRoom(rRoom[1]);
          setPlayer(rUsername[1]);
          enterRoomUrl(rRoom[1], rUsername[1]);
        }
      }
    },
    []);

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

  function move(e: KeyboardEvent) {
    if (socket !== null) {
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
        default:
          return;
      }
    }
  }

  useEffect(
    () => {
      if (started && socket !== null) {
        document.addEventListener('keyup', move);
        return function cleanup() {
          document.removeEventListener('keyup', move);
        };
      }
    },
    [socket]);

  const enterRoom = async (event: any) => {
    event.preventDefault();
    await props.resetGame();
    await props.startGame(room, player);
    const s = socketIOClient(socketUrl, {
      query: {
        room,
        username: player,
      },
    });
    setStarted(true);
    setStarted(true);
    setSocket(s);
    props.history.push(`/#${room}[${player}]`);
  };

  const enterRoomUrl = async (r: string, p: string) => {
    await props.resetGame();
    await props.startGame(room, player);
    const s = socketIOClient(socketUrl, {
      query: {
        room: r,
        username: p,
      },
    });
    setStarted(true);
    setSocket(s);
    props.history.push(`/#${r}[${p}]`);
  };

  function handleChange(event: any) {
    if (event.target.name === 'room') {
      setRoom(event.target.value);
    } else if (event.target.name = 'player') {
      setPlayer(event.target.value);
    }
  }

  const play = () => {
    socket !== null && socket.emit('init');
  };

  const restart = () => {
    socket !== null && socket.emit('restart');
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
            restart={restart}
            started={props.started}
            count={props.count}
            username={props.username}
            action={props.action}
          />
          {socket !== null && <UseSocket socket={socket} />}
        </div>

      }

    </div>
  );
};

export default GamePage;
