import React, { Component, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Socket from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import { position } from '../../types/gameTypes';
import UseSocket from './UseSocket';
import Home from '../../components/Home/Home';
import RedTetris from '../../components/RedTetris/RedTetris';
import Game from '../../components/Game';
import './style.css';

interface GamePageProps {
  nagivation: any;
  history: any;
  socket: SocketIOClient.Socket;
  started: boolean;
  board: number[][];
  startGame: Function;
  endGame: Function;
}

const GamePage: React.SFC<GamePageProps> = (props) => {
  const [room, setRoom] = useState('');
  const [player, setPlayer] = useState('');
  const [socket, setSocket] = useState(Socket);
  const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);
  useEffect(() => {
    if (props.board && props.board !== undefined) {
      // let row: number[] = [];
      setRow([]);
      for (let i = 0; i < props.board.length; i += 1) {
        let nbEmpty = 0;
        for (let j = 0; j < props.board[i].length; j += 1) {
          if (props.board[i][j] === 0) {
            nbEmpty += 1;
          }
        }
        if (nbEmpty === 0) {
          setRow([...row, i]);
        }
      }
      console.log("ROW", row);
    }
  }, [props.board])

  useEffect(() => {
    if (props.started) {
      document.addEventListener("keyup", async (e) => {
        switch (e.key) {
          case "ArrowLeft":
            socket.emit('left');
            return;
          case "ArrowRight":
            socket.emit('right');
            return;
          case "ArrowDown":
            socket.emit('down');
            return;
          case "ArrowUp":
            socket.emit('up');
            return;
        }
      })
      return function cleanup() {
        document.removeEventListener('keydown', () => { });
      }
    }
  }, [socket]);

  const play = async (event: any) => {
    event.preventDefault();
    await props.startGame(room, player);
    const s = socketIOClient('http://localhost:4000', {
      transports: ['websocket'],
      query: {
        room: room,
        pseudo: player
      }
    });
    setSocket(s);
    s.emit('init');
    props.history.push(`/#${room}[${player}]`);
  }

  /* const reset = () => {
       props.reset();
   }
 
   const rotate = () => {
       props.rotate(props.pieceIndex);
   }
 
   const moveDown = () => {
       props.moveDown(props.position.x, props.position.y, props.board, props.piece, props.pieceIndex);
   }*/

  const handleChange = (event: any) => {
    if (event.target.name === 'room') {
      setRoom(event.target.value);
    } else if (event.target.name = 'player') {
      setPlayer(event.target.value);
    }
  }





  return (
    <div>


      {!props.started
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
            board={props.board}
            row={row}
          />
          <UseSocket socket={socket} />
        </div>

      }

    </div>
  );
};

export default GamePage;
