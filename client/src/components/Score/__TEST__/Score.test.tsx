import React from 'react';

import renderer from 'react-test-renderer';
import Score from '../Score';

it('renders correctly with defaults', () => {
  const score = renderer.create(<Score
    level={4}
    score={999}
  />).toJSON();
  expect(score).toMatchSnapshot();
});
