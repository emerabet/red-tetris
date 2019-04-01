import React from 'react';
import { storiesOf } from '@storybook/react';
import Oponent from './Oponent';

storiesOf('Oponent', module)
  .add('one oponent', () => (
    <Oponent
    spectre={
      {
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      }
    }
    />
  ));
