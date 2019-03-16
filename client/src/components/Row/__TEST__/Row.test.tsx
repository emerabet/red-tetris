import React from 'react';

import renderer from 'react-test-renderer';
import Row from '../Row';

it('renders correctly with defaults', () => {
  const row = renderer.create(<Row
    row={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            index={3}
  />).toJSON();
  expect(row).toMatchSnapshot();
});
