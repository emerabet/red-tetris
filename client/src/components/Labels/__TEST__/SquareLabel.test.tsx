import React from 'react';

import renderer from 'react-test-renderer';
import SquareLabel from '../SquareLabel';

it('renders correctly with defaults', () => {
  const squareLabel = renderer.create(<SquareLabel
    label="ABC"
     />).toJSON();
  expect(squareLabel).toMatchSnapshot();
});

it('renders correctly with defaults red', () => {
  const squareLabel = renderer.create(<SquareLabel
    label="ABC"
    red
     />).toJSON();
  expect(squareLabel).toMatchSnapshot();
});
