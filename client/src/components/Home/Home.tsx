import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import RedTetris from '../RedTetris';

import './style.css';

interface HomeProps {
  room: string;
  player: string;
  play: (event: any) => {};
  handleChange: (event: any) => void;

}

const Home: React.SFC<HomeProps> = (props) => {
  const [roomClassName, setRoomClassName] = useState('');
  const [playerClassName, setPlayerClassName] = useState('');

  function roomShake() {
    setRoomClassName('shake');
    setTimeout(
      () => {
        setRoomClassName('');
      },
      1000);
  }

  function playerShake() {
    setPlayerClassName('shake');
    setTimeout(
      () => {
        setPlayerClassName('');
      },
      1000);
  }

  return (
    <div className="mainDiv flexColumn">
      <RedTetris />
      <form className="formFlex" onSubmit={props.play}>
        {props.room !== '' && <SquareLabel label="room" additionalClassName="big" />}
        <div className="namer">
          <div className="namer-input">
            <input
              onBlur={roomShake}
              className={roomClassName}
              name="room"
              type="text"
              placeholder="ROOM"
              value={props.room}
              onChange={props.handleChange}></input>
          </div>
        </div>
        {props.player !== '' && <SquareLabel label="player" additionalClassName="big" />}
        <div className="namer">
          <div className="namer-input">
            <input
              onBlur={playerShake}
              className={playerClassName}
              name="player"
              type="text"
              placeholder="PLAYER"
              value={props.player}
              onChange={props.handleChange}></input>
          </div>
        </div>
        <button
          type="submit"
          className="plus"
          disabled={props.room === '' || props.player === ''}></button>
      </form>
    </div>
  );
};

export default Home;
