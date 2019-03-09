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
  score: number;
}

const Game: React.SFC<GameProps> = (props) => {
  return (
    <div className="mainDivGame flexRow">
      <SectionLeft
        room={props.room}
        player={props.player}
        status={props.status}
        score={props.score}
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
