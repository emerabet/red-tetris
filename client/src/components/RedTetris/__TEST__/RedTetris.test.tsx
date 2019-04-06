import React from 'react';

import renderer from 'react-test-renderer';
import RedTetris from '../RedTetris';

it('renders correctly with defaults', () => {
  const redTetris = renderer.create(<RedTetris />).toJSON();
  expect(redTetris).toMatchSnapshot();
});
