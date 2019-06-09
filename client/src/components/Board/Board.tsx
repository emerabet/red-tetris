import React, { Component, useState, useEffect } from 'react';
import Row from '../Row';

import './style.css';

interface BoardProps {
  board: number[][];
}

const Board: React.SFC<BoardProps> = (props) => {

  function renderBoard() {
    return (
      <div className="board">
        {props.board.map((d: number[], i: number) => {
          return (
            <Row
              row={d}
              index={i}
              key={i}
            />
          );
        })}
      </div>
    );
  }

  function renderBoard2() {
    return (
      <div className="board">
        {props.board.map((d: any, i: number) => {
          return (
            <div key={i} className="boardRowDestruction">
              {
                d.map((c: any, j: number) => {
                  return (
                    <div key={j} className="destructionRow">
                      <div className="destructionCol">
                        <div className={`boardCellDestruction effectL${j}`}>{}</div>
                        <div className={`boardCellDestruction effectR${j}`}>{}</div>
                      </div>
                      <div className="destructionCol">
                        <div className={`boardCellDestruction effectT${j}`}>{}</div>
                        <div className={`boardCellDestruction effectB${j}`}>{}</div>
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
  );
};

export default Board;
