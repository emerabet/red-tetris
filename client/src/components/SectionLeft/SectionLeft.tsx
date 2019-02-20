import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import NextPieces from '../NextPieces';
import * as utils from '../../Utils/constants';

import './style.css';

interface SectionLeftProps {
  room: string;
  player: string;
}

const SectionLeft: React.SFC<SectionLeftProps> = (props) => {

  return (
    <div className="sectionLeft">
      <RedTetris additionalClassName="small" />
      <NextPieces
        pieces={[
          utils.SAHPES_T[0],
          utils.SHAPES_I[0],
          utils.SHAPES_Z[0]]}
      />

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
