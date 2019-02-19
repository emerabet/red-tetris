import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface BoardProps {
  color:number;
  index:number;
}

const Board: React.SFC<BoardProps> = (props) => {

  return (
    <div key={props.index} className={`boardCell c${props.color}`}>{}</div>
  );
};

export default Board;
