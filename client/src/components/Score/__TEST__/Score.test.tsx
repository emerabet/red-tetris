import React from 'react';
import renderer from 'react-test-renderer';
import Score from '../Score';

it('renders correctly with defaults', () => {
  const score = renderer.create(<Score
    level={4}
    score={999}
    count={2}
    small
    username="test"
    action="joined"
  />).toJSON();
  expect(score).toMatchSnapshot();
});

it('renders correctly with defaults', () => {
  const score = renderer.create(<Score
    level={4}
    score={999}
    count={2}
    username="test"
    action="joined"
  />).toJSON();
  expect(score).toMatchSnapshot();
});
