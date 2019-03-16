import React from 'react';
import RedTetris from '../RedTetris';
import LabeledBox from '../LabeledBox';
import Piece from '../Piece';
import { SHAPES_Z, SHAPES_S, SHAPES_J, SHAPES_L, SAHPES_T, SHAPES_I, SHAPES_O }
from '../../Utils/constants';

import './style.css';

const piecesType:{[name: string]:number[][]} = {
  Z: SHAPES_Z[0],
  S: SHAPES_S[0],
  J: SHAPES_J[0],
  L: SHAPES_L[0],
  T: SAHPES_T[0],
  I: SHAPES_I[0],
  O: SHAPES_O[0],
};

interface NextPiecesProps {
  pieces: string;
  vertical?: boolean;
}

const NextPieces: React.SFC<NextPiecesProps> = (props) => {
  const pcs = props.pieces.split('');
  return (
    <div className="nextPieces">
      <div className={props.vertical ? 'pieceColumn' : 'pieceRow'}>
        {
          pcs.map((piece:string, i:number) => {
            return (
              <Piece key={`piece_${i}`} piece={piecesType[piece]} />
            );
          })
        }
      </div>
    </div>

  );
};

export default NextPieces;
