import React from 'react';

import renderer from 'react-test-renderer';
import SectionRight from '../SectionRight';

it('renders correctly with defaults', () => {
  const sectionRight = renderer.create(<SectionRight
    oponents={[{
        name: 'oponenetetete',
        game: '0123456789',
      },
      {
        name: 'booottt',
        game: '4444333345',
      },
      {
        name: 'pop',
        game: '88AAJJIIIJ',
      }, {
        name: 'bobo',
        game: '0040565600',
      }]}
      pieces={'ZOL'}
  />).toJSON();
  expect(sectionRight).toMatchSnapshot();
});
