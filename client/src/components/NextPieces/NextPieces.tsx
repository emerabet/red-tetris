import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import Piece from '../Piece';
import * as utils from '../../Utils/constants';

import './style.css';

interface NextPiecesProps {
  pieces: number[][][];
}

const NextPieces: React.SFC<NextPiecesProps> = (props) => {

  return (
    <div className="nextPieces">
      <div className="pieceRow">
        {
          props.pieces.map((piece, i) => {
            return (
              <Piece key={`piece_${i}`} piece={piece} />
            );
          })
        }
      </div>
    </div>

  );
};

export default NextPieces;
