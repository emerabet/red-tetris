import React from 'react';
import SquareLabel from '../Labels';

import { SpectreI } from '../../types/gameTypes';

import './style.css';

interface OponentProps {
  spectre: SpectreI;
}

const Oponent: React.SFC<OponentProps> = (props) => {
  const game: string[] = props.spectre.spectre.split('');
  return (
    <div className="opponentFlex">
      <div className="opponent">
        {
          game.map((g, i) => {
            return (
              <div key={`op_${i}`} className={`opponentColumn opponentColumn_${g}`}></div>
            );
          })
        }
      </div>
      <SquareLabel
        label={props.spectre.id}
        white
        additionalClassName="small"
      />
    </div>

  );
};

export default Oponent;
