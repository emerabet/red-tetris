import React from 'react';

import './style.css';

interface GameProps {
  label?: string;
  content: string;
}

const LabeledBox: React.SFC<GameProps> = (props) => {
  return (
    <div className="outerLabel">
      <div>{props.label}</div>
      <div className="neon">{props.content}</div>
    </div>
  );
};

export default LabeledBox;
