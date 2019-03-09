import React from 'react';
import SquareLabel from '../Labels';

import { OponentInterface } from '../../types/gameTypes';

import './style.css';

interface OponentProps {
  oponent: OponentInterface;
}

const Oponent: React.SFC<OponentProps> = (props) => {
  const game: string[] = props.oponent.game.split('');
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
        label={props.oponent.name}
        white
        additionalClassName="small"
      />
    </div>

  );
};

export default Oponent;
