import React from 'react';

import renderer from 'react-test-renderer';
import AdminButton from '../AdminButton';

it('renders correctly with defaults', () => {
  const button = renderer.create(<AdminButton text="start" play={() => {}}/>).toJSON();
  expect(button).toMatchSnapshot();
});
