import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import NextPieces from '../NextPieces';
import * as utils from '../../Utils/constants';
import SquareLabel from '../Labels';
import Oponent from '../Oponent';

import { OponentInterface } from '../../types/gameTypes';

import './style.css';

interface SectionRightProps {
  oponents: OponentInterface[];
}

const SectionRight: React.SFC<SectionRightProps> = (props) => {

  return (
    <div className="sectionRight">
      <div className="sectionRightInside">
        <SquareLabel
          label="next pieces:"
        />
        <NextPieces
          pieces={[
            utils.SAHPES_T[0],
            utils.SHAPES_I[0],
            utils.SHAPES_Z[0]]}
        />
        <SquareLabel
          label="opponents:"
        />
        <div className="opponents">
          {
            props.oponents.map((oponent, i) => {
              return <Oponent key={`op_${i}`} oponent={oponent} />;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default SectionRight;
