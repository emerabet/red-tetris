import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import RedTetris from '../RedTetris';
import { useWindowSize } from '../../effects/useWindowSize';
import './style.css';

interface HomeProps {
  room: string;
  player: string;
  enterRoom: (event: any) => {};
  handleChange: (event: any) => void;
}

const Home: React.SFC<HomeProps> = (props) => {
  const [roomClassName, setRoomClassName] = useState('');
  const [playerClassName, setPlayerClassName] = useState('');
  const dim = useWindowSize();

  function roomShake() {
    setRoomClassName('shake');
    const t = setTimeout(
      () => {
        setRoomClassName('');
      },
      1000);
    return function clearUp() {
      clearTimeout(t);
    };
  }

  function playerShake() {
    setPlayerClassName('shake');
    const t = setTimeout(
      () => {
        setPlayerClassName('');
      },
      1000);
    return function clearUp() {
      clearTimeout(t);
    };
  }

  return (
    <div className="mainDivHome">
    <RedTetris additionalClassName={dim.outerWidth > 480 ? '' :
    dim.outerWidth > 340 ? 'medium' : 'small' }/>
      <form className="formFlex" onSubmit={props.enterRoom}>
        {props.room !== '' && <SquareLabel label="room" additionalClassName="big" />}
        <div className="namer">
          <div className="namer-input">
            <input
              onBlur={roomShake}
              className={`${roomClassName} roomInput`}
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
              className={`${playerClassName} playerInput`}
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
