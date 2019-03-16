import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface ScoreProps {
  level:number;
  score: number;
  small?: boolean;
}

const Score: React.SFC<ScoreProps> = (props) => {

  return (
    <div className={props.small ? 'scoreContainerSmall' : 'scoreContainer'}>
    <div>LEVEL: {props.level}</div>
      <div>SCORE: {props.score}</div>
    </div>

  );
};

export default Score;
