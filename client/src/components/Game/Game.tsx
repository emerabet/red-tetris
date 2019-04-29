import React from 'react';
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
import { SpectreI } from '../../types/gameTypes';

import './style.css';

interface GameProps {
  board: number[][];
  row: number[];
  room: string;
  player: string;
  spectres: SpectreI[];
  level: number;
  score: number;
  pieces: string;
  play: () => void;
  started: boolean;
  count: number;
  username: string;
  action: string;
}

const Game: React.SFC<GameProps> = (props) => {
  const dim = useWindowSize();

  return (
    <div className="mainDivGame flexRow">
      {dim.outerWidth > 750 &&
      <SectionLeft
        room={props.room}
        player={props.player}
        status={props.started ? 'restart' : 'start'}
        level={props.level}
        score={props.score}
        play={props.play}
        count={props.count}
        username={props.username}
        action={props.action}
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
          text={props.started ? 'restart' : 'start'}
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
          count={props.count}
          username={props.username}
          action={props.action}
        />
        {props.started && <NextPieces
          vertical
          pieces={props.pieces}
        />}
        </div> : <div className="flexColumnR">
        <Score
          small
          level={props.level}
          score={props.score}
          count={props.count}
          username={props.username}
          action={props.action}
        />
        {props.started && <NextPieces
          vertical
          pieces={props.pieces}
        />}
        <div className="admBtnSmall">
      <AdminButton
      text={props.started ? 'restart' : 'start'}
      play={props.play}
    />
    </div>
        </div>}
        </div>
        {props.started && <div className="opponentsNoWrap">
          {
            props.spectres.map((spectre, i) => {
              return <Oponent key={`op_${i}`} spectre={spectre} />;
            })
          }
        </div>}
          </div>
      }
      {dim.outerWidth > 750 &&
      <SectionRight
        spectres={props.spectres}
        pieces={props.pieces}
        started={props.started}
      />
      }
    </div>

  );
};

export default Game;
