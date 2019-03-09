import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import LabeledBox from '../LabeledBox';
import SectionLeft from '../SectionLeft';
import Board from '../Board';
import SectionRight from '../SectionRight';

import { OponentInterface } from '../../types/gameTypes';

import './style.css';

interface GameProps {
  board: number[][];
  row: number[];
  room: string;
  player: string;
  oponents: OponentInterface[];
  status: string;
}

const Game: React.SFC<GameProps> = (props) => {
  /*const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);*/

  return (
    <div className="mainDivGame flexRow">
      {console.log("IN GAME", props.board)}
      <SectionLeft
        room={props.room}
        player={props.player}
        status={props.status}
        score={999}
      />
      <Board
        board={props.board}
        rowDestruction={props.row}
      />
      <SectionRight
        oponents={props.oponents}
      />
    </div>

  );
};

export default Game;
