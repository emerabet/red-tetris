import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import NextPieces from '../NextPieces';
import * as utils from '../../Utils/constants';
import SquareLabel from '../Labels';
import Oponent from '../Oponent';

import { SpectreI } from '../../types/gameTypes';

import './style.css';

interface SectionRightProps {
  spectres: SpectreI[];
  pieces: string;
}

const SectionRight: React.SFC<SectionRightProps> = (props) => {

  return (
    <div className="sectionRight">
      <div className="sectionRightInside">
        <SquareLabel
          label="next pieces:"
        />
        <NextPieces
          pieces={props.pieces}
        />
        <SquareLabel
          label="opponents:"
        />
        <div className="opponents">
          {
            props.spectres.map((spectre, i) => {
              return <Oponent key={`op_${i}`} spectre={spectre} />;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default SectionRight;
