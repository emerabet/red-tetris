import React from 'react';

import renderer from 'react-test-renderer';
import Oponent from '../Oponent';

it('renders correctly with defaults', () => {
  const oponent = renderer.create(<Oponent
    spectre = {{
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      }
    }
     />).toJSON();
  expect(oponent).toMatchSnapshot();
});
