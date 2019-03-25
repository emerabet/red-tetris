import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import LabeledBox from '../LabeledBox';
import SectionLeft from '../SectionLeft';
import Board from '../Board';
import SectionRight from '../SectionRight';
import RedTetris from '../RedTetris';
import AdminButton from '../AdminButton';
import NextPieces from '../NextPieces';
import Oponent from '../Oponent';
import Score from '../Score';
import { useWindowSize } from '../../effects/useWindowSize';
import { OponentInterface } from '../../types/gameTypes';

import './style.css';

interface GameProps {
  board: number[][];
  row: number[];
  room: string;
  player: string;
  oponents: OponentInterface[];
  status: string;
  level: number;
  score: number;
  pieces: string;
  play: () => void;
}

const Game: React.SFC<GameProps> = (props) => {
  const dim = useWindowSize();

  return (
    <div className="mainDivGame flexRow">
      {dim.outerWidth > 750 &&
      <SectionLeft
        room={props.room}
        player={props.player}
        status={props.status}
        level={props.level}
        score={props.score}
        play={props.play}
      />}
      {
        dim.outerWidth >= 750 ?
        <Board
        board={props.board}
        rowDestruction={props.row}
      />
        :
        <div>
        <RedTetris additionalClassName="small" />
        <div className="flexRowGame">
        {dim.outerWidth >= 535 && <div className="flexColumnL">
            <LabeledBox
              label="room:"
              content={props.room}
            />
            <LabeledBox
              label="player:"
              content={props.player}
            />
            <AdminButton
          text={props.status}
          play={props.play}
        />
          </div>}
        <div className="flexColumnGame">
          <Board
          board={props.board}
          rowDestruction={props.row}
        />
        </div>
        {dim.outerWidth >= 535 ?
        <div className="flexColumnR">
        <Score
          level={props.level}
          score={props.score}
        />
        <NextPieces
          vertical
          pieces={props.pieces}
        />
        </div> : <div className="flexColumnR">
        <Score
          small
          level={props.level}
          score={props.score}
        />
        <NextPieces
          vertical
          pieces={props.pieces}
        /></div>}
        </div>
        <div className="opponentsNoWrap">
          {
            props.oponents.map((oponent, i) => {
              return <Oponent key={`op_${i}`} oponent={oponent} />;
            })
          }
        </div>
        {dim.outerWidth < 535 &&
        <div className="admBtnSmall">
      <AdminButton
      text={props.status}
      play={props.play}
    />
    </div>
      }
          </div>
      }
      {dim.outerWidth > 750 &&
      <SectionRight
        oponents={props.oponents}
        pieces={props.pieces}
      />
      }
    </div>

  );
};

export default Game;
