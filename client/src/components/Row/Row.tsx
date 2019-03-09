import React, { Component, useState, useEffect } from 'react';
import Cell from '../Cell';

import './style.css';

interface RowProps {
  row: number[];
  index: number;
}

const Row: React.SFC<RowProps> = (props) => {
  return (
    <div key={props.index} className="boardRow">
      {
        props.row.map((c: number, j: number) => {
          return (
            <Cell key={`cell_${j}`} index={j} color={c} />
          );
        })
      }
    </div>
  );
};

export default Row;
