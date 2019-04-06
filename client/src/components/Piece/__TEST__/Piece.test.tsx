import React from 'react';

import renderer from 'react-test-renderer';
import Piece from '../Piece';
import * as utils from '../../../Utils/constants';

it('renders correctly with defaults', () => {
  const piece = renderer.create(<Piece
    piece={utils.SAHPES_T[0]}
     />).toJSON();
  expect(piece).toMatchSnapshot();
});
