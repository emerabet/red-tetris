import React from 'react';

import renderer from 'react-test-renderer';
import Home from '../Home';

it('renders correctly with defaults', () => {
  const home = renderer.create(<Home
    room="my room"
    player="my name"
    play={(_) => { return 'void'; }}
    handleChange={(_) => { return 'void'; }}
     />).toJSON();
  expect(home).toMatchSnapshot();
});
