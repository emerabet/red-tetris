import React, { Component, useState, useEffect } from 'react';
import Row from '../Row/Row';
import Cell from '../Cell';

import './style.css';

interface PieceProps {
  piece: number[][];
}

const pieces = {

};

const Piece: React.SFC<PieceProps> = (props) => {
  return (
    <div className="nextPiece">
      {
        props.piece.map((row, index) => {
          return (
            <Row
              row={row}
              index={index}
            />
          );
        })
      }
    </div>
  );
};

export default Piece;
