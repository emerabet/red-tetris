import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface ScoreProps {
  level:number;
  score: number;
  small?: boolean;
  count: number;
  username: string;
  action: string;
}

const Score: React.SFC<ScoreProps> = (props) => {
  const [snack, setSnack] = useState('snackbar');

  useEffect(
    () => {
      setSnack('snackbar show');
      const t = setTimeout(() => setSnack('snackbar'), 2000);
      return function cleanUp() {
        clearTimeout(t);
      };
    },
    [props.username, props.action]);

  return (
    <div className={props.small ? 'scoreContainerSmall' : 'scoreContainer'}>
      {props.username !== '' && props.action !== '' &&
      <div className={snack}>{`${props.username} has ${props.action}`}</div>}
      <div>PLAYERS: {props.count}</div>
      <div>LEVEL: {props.level}</div>
      <div>SCORE: {props.score}</div>
    </div>

  );
};

export default Score;
