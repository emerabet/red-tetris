import React from 'react';

import renderer from 'react-test-renderer';
import Oponent from '../Oponent';

it('renders correctly with defaults', () => {
  const oponent = renderer.create(<Oponent
    oponent={{
        name: 'oponenetetete',
        game: '0123456789',
      }}
     />).toJSON();
  expect(oponent).toMatchSnapshot();
});
