import React from 'react';

import renderer from 'react-test-renderer';
import NextPieces from '../NextPieces';

it('renders correctly with defaults', () => {
  const nextPieces = renderer.create(<NextPieces
    pieces="ZOL"
     />).toJSON();
  expect(nextPieces).toMatchSnapshot();
});
