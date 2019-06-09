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

  function renderBigScreen() {
    return (
    <>
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
      />
      {renderBoard()}
      <SectionRight
        spectres={props.spectres}
        pieces={props.pieces}
        started={props.started}
      />
    </>);
  }

  function renderMediumScreen() {
    return (
      <>
        <div>
          <RedTetris additionalClassName="small" />
          <div className="flexRowGame">
            <div className="flexColumnL">
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
            </div>
          <div className="flexColumnGame">
            {renderBoard()}
          </div>
          {renderSmallMediumRight(false)}
        </div>
        {renderOpponents()}
        </div>
      </>
    );
  }

  function renderSmallScreen() {
    return (
      <>
        <div>
          <RedTetris additionalClassName="small" />
          <div className="flexRowGame">
            <div className="flexColumnGame">
              {renderBoard()}
            </div>
              {renderSmallMediumRight(true)}
          </div>
          {renderOpponents()}
        </div>
      </>
    );
  }

  function renderBoard() {
    return (
      <Board
        board={props.board}
      />
    );
  }

  function renderOpponents() {
    return(
      <>
      {props.started &&
        <div className="opponentsNoWrap">
          {
            props.spectres.map((spectre, i) => {
              return <Oponent key={`op_${i}`} spectre={spectre} />;
            })
          }
        </div>
      }
      </>
    );
  }

  function renderSmallMediumRight(small: boolean) {
    return (
      <div className="flexColumnR">
        <Score
          small={small}
          level={props.level}
          score={props.score}
          count={props.count}
          username={props.username}
          action={props.action}
        />
        {
          props.started &&
            <NextPieces
              vertical
              pieces={props.pieces}
            />
        }
        {
          small &&
            <div className="admBtnSmall">
              <AdminButton
                text={props.started ? 'restart' : 'start'}
                play={props.play}
              />
            </div>
        }
      </div>
    );
  }

  return (
    <div className="mainDivGame flexRow">
      {dim.outerWidth >= 750 ?
        renderBigScreen()
        : dim.outerWidth >= 535 ?
        renderMediumScreen()
        : renderSmallScreen()
      }
    </div>

  );
};

export default Game;
