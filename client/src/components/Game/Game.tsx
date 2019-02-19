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
    <div className="mainDivGame flexRow">

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
        <div className="opponents">
          <div className="opponentFlex">
            <div className="opponent">
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
            </div>
            <SquareLabel
              label="opponent1"
              red
              additionalClassName="small"
            />
          </div>
          <div className="opponentFlex">
            <div className="opponent">
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
            </div>
            <SquareLabel
              label="opponent1"
              red
              additionalClassName="small"
            />
          </div>
          <div className="opponentFlex">
            <div className="opponent">
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
            </div>
            <SquareLabel
              label="opponent1"
              red
              additionalClassName="small"
            />
          </div>
          <div className="opponentFlex">
            <div className="opponent">
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
              <div className="opponentRow opponentFull"></div>
            </div>
            <SquareLabel
              label="opponent1"
              red
              additionalClassName="small"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Game;
