import React from 'react';

import renderer from 'react-test-renderer';
import LabeledBox from '../LabeledBox';

it('renders correctly with defaults', () => {
  const labeledBox = renderer.create(<LabeledBox
    label="room"
    content="super room"
     />).toJSON();
  expect(labeledBox).toMatchSnapshot();
});
