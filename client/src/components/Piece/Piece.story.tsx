import React from 'react';
import { storiesOf } from '@storybook/react';
import Piece from './Piece';
import * as utils from '../../Utils/constants';

storiesOf('Piece', module)
    .add('shapes', () => (
        <>
            <div className="shapesRow">
                <Piece
                    piece={utils.SAHPES_T[0]}
                />
                <Piece
                    piece={utils.SAHPES_T[1]}
                />
                <Piece
                    piece={utils.SAHPES_T[2]}
                />
                <Piece
                    piece={utils.SAHPES_T[3]}
                />
            </div>
            <div className="shapesRow">
                <Piece
                    piece={utils.SHAPES_I[0]}
                />
                <Piece
                    piece={utils.SHAPES_I[1]}
                />
                <Piece
                    piece={utils.SHAPES_I[2]}
                />
                <Piece
                    piece={utils.SHAPES_I[3]}
                />
            </div>
            <div className="shapesRow">
                <Piece
                    piece={utils.SHAPES_J[0]}
                />
                <Piece
                    piece={utils.SHAPES_J[1]}
                />
                <Piece
                    piece={utils.SHAPES_J[2]}
                />
                <Piece
                    piece={utils.SHAPES_J[3]}
                />
            </div>
            <div className="shapesRow">
                <Piece
                    piece={utils.SHAPES_L[0]}
                />
                <Piece
                    piece={utils.SHAPES_L[1]}
                />
                <Piece
                    piece={utils.SHAPES_L[2]}
                />
                <Piece
                    piece={utils.SHAPES_L[3]}
                />
            </div>
            <div className="shapesRow">
                <Piece
                    piece={utils.SHAPES_O[0]}
                />
            </div>
            <div className="shapesRow">
                <Piece
                    piece={utils.SHAPES_S[0]}
                />
                <Piece
                    piece={utils.SHAPES_S[1]}
                />
                <Piece
                    piece={utils.SHAPES_S[2]}
                />
                <Piece
                    piece={utils.SHAPES_S[3]}
                />
            </div>
            <div className="shapesRow">
                <Piece
                    piece={utils.SHAPES_Z[0]}
                />
                <Piece
                    piece={utils.SHAPES_Z[1]}
                />
                <Piece
                    piece={utils.SHAPES_Z[2]}
                />
                <Piece
                    piece={utils.SHAPES_Z[3]}
                />
            </div>
        </>
    ));
