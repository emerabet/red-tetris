import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import NextPieces from '../NextPieces';
import AdminButton from '../AdminButton';
import Score from '../Score';
import * as utils from '../../Utils/constants';

import './style.css';

interface SectionLeftProps {
  room: string;
  player: string;
  status: string;
  score: number;
}

const SectionLeft: React.SFC<SectionLeftProps> = (props) => {

  return (
    <div className="sectionLeft">
      <RedTetris additionalClassName="small" />
      <Score
        score={props.score}
      />
      <LabeledBox
        label="room:"
        content={props.room}
      />
      <LabeledBox
        label="player:"
        content={props.player}
      />
      <AdminButton
        text={props.status}
      />
    </div>
  );
};

export default SectionLeft;
