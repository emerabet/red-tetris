import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface ScoreProps {
  score: number;
}

const Score: React.SFC<ScoreProps> = (props) => {

  return (
    <div className="scoreContainer">
      SCORE: 999
    </div>

  );
};

export default Score;
