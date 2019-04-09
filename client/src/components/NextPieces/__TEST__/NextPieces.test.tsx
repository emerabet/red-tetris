import React from 'react';

import renderer from 'react-test-renderer';
import NextPieces from '../NextPieces';

it('renders correctly with defaults', () => {
  const nextPieces = renderer.create(<NextPieces
    pieces="ZOL"
     />).toJSON();
  expect(nextPieces).toMatchSnapshot();
});

it('renders correctly with defaults vertical', () => {
  const nextPieces = renderer.create(<NextPieces
    pieces="ZOL"
    vertical
     />).toJSON();
  expect(nextPieces).toMatchSnapshot();
});