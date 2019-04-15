import React from 'react';
import NextPieces from '../NextPieces';
import Oponent from '../Oponent';

import { SpectreI } from '../../types/gameTypes';

import './style.css';

interface SectionRightProps {
  spectres: SpectreI[];
  pieces: string;
  started: boolean;
}

const SectionRight: React.SFC<SectionRightProps> = (props) => {

  return (
    <div className="sectionRight">
      {props.started && <div className="sectionRightInside">
        <div className="lab">NEXT PIECES</div>
        <NextPieces
          pieces={props.pieces}
        />
        <div className="lab">OPPONENTS</div>
        <div className="opponents">
          {
            props.spectres.map((spectre, i) => {
              return <Oponent key={`op_${i}`} spectre={spectre} />;
            })
          }
        </div>
      </div>}
    </div>
  );
};

export default SectionRight;
