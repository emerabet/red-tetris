import React from 'react';

import renderer from 'react-test-renderer';
import SectionRight from '../SectionRight';

it('renders correctly with defaults', () => {
  const sectionRight = renderer.create(<SectionRight
    spectres={
      [{
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      }, {
        id: 'oponent 2',
        spectre: '0123456789',
        username: 'bbb',
      }]
    }
      pieces={'ZOL'}
  />).toJSON();
  expect(sectionRight).toMatchSnapshot();
});
