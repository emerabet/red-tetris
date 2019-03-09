import React from 'react';
import { storiesOf } from '@storybook/react';
import SectionRight from './SectionRight';

storiesOf('SectionRight', module)
  .add('4 other players', () => (
    <SectionRight
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
    />
  ));
