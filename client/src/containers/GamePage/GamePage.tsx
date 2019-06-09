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
      if (props.history.location.pathname !== '') {
        const reRoom = /\/(.*)\[/g;
        const reUsername = /\[(.*)\]/g;
        const rRoom = reRoom.exec(props.history.location.pathname);
        const rUsername = reUsername.exec(props.history.location.pathname);
        if (rRoom !== null && rUsername !== null) {
          setRoom(rRoom[1]);
          setPlayer(rUsername[1]);
          enterRoomUrl(rRoom[1], rUsername[1]);
        }
      }
    },
    []);

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

  const prepareSocket = async (r:string, p:string) => {
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

  const enterRoom = async (event: any) => {
    event.preventDefault();
    prepareSocket(room, player);
  };

  const enterRoomUrl = async (r: string, p: string) => {
    prepareSocket(r, p);
  };

  function handleChange(event: any) {
    if (event.target.name === 'room') {
      setRoom(event.target.value);
    } else if (event.target.name = 'player') {
      setPlayer(event.target.value);
    }
  }

  const play = () => {
    if (props.started === true) {
      socket !== null && socket.emit('restart');
    } else {
      socket !== null && socket.emit('init');
    }
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
            room={room}
            player={player}
            spectres={props.spectres}
            pieces={props.state.pieces}
            play={play}
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
