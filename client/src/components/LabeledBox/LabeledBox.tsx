import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import RedTetris from '../RedTetris';

import './style.css';

interface GameProps {
  label: string;
  content: string;
}

const LabeledBox: React.SFC<GameProps> = (props) => {
  return (
    <div className="outerLabel">
      <SquareLabel label={props.label} />
      <SquareLabel label={props.content} red />
    </div>
  );
};

export default LabeledBox;
