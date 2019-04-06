import React from 'react';

import renderer from 'react-test-renderer';
import Cell from '../Cell';

it('renders correctly with defaults', () => {
  const cell = renderer.create(<Cell
    color={3}
    index={2} />).toJSON();
  expect(cell).toMatchSnapshot();
});
