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
      setTimeout(() => setSnack('snackbar'), 2000);
    },
    [props.count, props.username, props.action]);

  return (
    <div className={props.small ? 'scoreContainerSmall' : 'scoreContainer'}>
      <div className={snack}>{`${props.username} has ${props.action}`}</div>
      <div>PLAYERS: {props.count}</div>
      <div>LEVEL: {props.level}</div>
      <div>SCORE: {props.score}</div>
    </div>

  );
};

export default Score;
