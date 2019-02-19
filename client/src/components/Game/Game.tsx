import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import LabeledBox from '../LabeledBox';
import SectionLeft from '../SectionLeft';
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

      <SectionLeft
        room={props.room}
        player={props.player}
      />
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
