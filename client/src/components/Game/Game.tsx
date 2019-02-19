import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import Board from '../Board';

import './style.css';

interface GameProps {
  board: number[][];
  row: number[];
  room: string;
  player: string;
}

const Game: React.SFC<GameProps> = (props) => {
  /*const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);*/

  return (
    <div className="mainDiv flexRow">

      <div className="sectionLeft">
        <RedTetris additionalClassName="small" />
        <LabeledBox
          label="room:"
          content={props.room}
        />
        <LabeledBox
          label="player:"
          content={props.player}
        />
      </div>
      <Board
        board={props.board}
        rowDestruction={props.row}
      />
      <div className="sectionRight">
        <SquareLabel
          label="opponents:"
        />
        <LabeledBox
          content="oponent1"
        />

      </div>
    </div>

  );
};

export default Game;
