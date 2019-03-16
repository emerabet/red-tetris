import React from 'react';

import renderer from 'react-test-renderer';
import Star from '../Star';

it('renders correctly with defaults', () => {
  const star = renderer.create(<Star />).toJSON();
  expect(star).toMatchSnapshot();
});
