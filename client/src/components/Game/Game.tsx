import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import RedTetris from '../RedTetris';
import UseSocket from '../../containers/GamePage/UseSocket';

import './style.css';

interface GameProps {
  board: number[][];
  row: number[];
}

const Game: React.SFC<GameProps> = (props) => {
  const initialRowDestruction: number[] = [];
  const [row, setRow] = useState(initialRowDestruction);

  function renderBoard() {
    let i = 0;
    let j = 0;
    return (
      <div className="board">
        {props.board.map((d: any) => {
          return (
            <div key={i++} className="boardRow">
              {
                d.map((c: any) => {
                  return (
                    <div key={j++} className={`boardCell c${c}`}>{/*c*/}</div>
                  );
                })
              }
            </div>
          );
        })}
      </div>
    );
  }

  function renderBoard2() {
    let i = 0;
    let j = 0;
    return (
      <div className="board">
        {props.board.map((d: any) => {
          let r = 0;
          return (
            <div key={i++} className={row.includes(i - 1)
              ? 'boardRowDestructionOK' : 'boardRowDestruction'}>
              {
                d.map((c: any) => {
                  return (
                    <div key={j++} className="destructionRow">
                      <div className="destructionCol">
                        {/* {console.log(i,j)} */}
                        <div className={`boardCellDestruction effectL${r}`}>{}</div>
                        <div className={`boardCellDestruction effectR${r}`}>{}</div>
                      </div>
                      <div className="destructionCol">
                        <div className={`boardCellDestruction effectT${r}`}>{}</div>
                        <div className={`boardCellDestruction effectB${r++}`}>{}</div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mainDiv flexRow">

      <div className="sectionLeft">
        <RedTetris additionalClassName="small" />

      </div>
      <div className="outerBoard">

        <div className="boardSpace">
          <svg className="pulse" viewBox="0 0 1024 1024" version="1.1">
            <circle id="Oval" cx="512" cy="512" r="512"></circle>
            <circle id="Oval" cx="512" cy="512" r="512"></circle>
            <circle id="Oval" cx="512" cy="512" r="512"></circle>
          </svg>
          <div className="boardInner">
            <div className="bar top "></div>
            <div className="bar right delay"></div>
            <div className="bar bottom delay"></div>
            <div className="bar left "></div>
            {renderBoard()}
            {renderBoard2()}
          </div>
        </div>
      </div>
      <div className="sectionRight">
        Opponents
      </div>
    </div>

  );
};

export default Game;
