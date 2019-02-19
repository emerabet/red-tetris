import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';

import './style.css';

interface SectionLeftProps {
  room: string;
  player: string;
}

const SectionLeft: React.SFC<SectionLeftProps> = (props) => {

  return (
    <div className="sectionLeft">
      <RedTetris additionalClassName="small" />
      <LabeledBox
        label="room:"
        content={props.room}
      />
      <LabeledBox
        label="player:"
        content={props.player}
      />
    </div>
  );
};

export default SectionLeft;
