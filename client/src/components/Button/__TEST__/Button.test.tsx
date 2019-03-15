import React from 'react';

import renderer from 'react-test-renderer';
import Button from '../Button';

it('renders correctly with defaults', () => {
  const button = renderer.create(<Button
    handleClick={() => {}}>Hello Button</Button>).toJSON();
  expect(button).toMatchSnapshot();
});
