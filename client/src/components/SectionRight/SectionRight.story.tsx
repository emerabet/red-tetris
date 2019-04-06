import React from 'react';
import { storiesOf } from '@storybook/react';
import SectionRight from './SectionRight';

storiesOf('SectionRight', module)
  .add('4 other players', () => (
    <SectionRight
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
      started={true}
    />
  ));
