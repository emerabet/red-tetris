import React, { Component, useState, useEffect } from 'react';
import SquareLabel from '../Labels';
import RedTetris from '../RedTetris';

import './style.css';

interface GameProps {
  label?: string;
  content: string;
}

const LabeledBox: React.SFC<GameProps> = (props) => {
  return (
    <div className="outerLabel">
      {props.label !== undefined && <SquareLabel label={props.label} />}
      <SquareLabel label={props.content} red additionalClassName="paddingLabel"/>
    </div>
  );
};

export default LabeledBox;
