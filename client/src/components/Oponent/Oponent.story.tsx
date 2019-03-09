import React from 'react';
import { storiesOf } from '@storybook/react';
import Oponent from './Oponent';

storiesOf('Oponent', module)
  .add('one oponent', () => (
    <Oponent
      oponent={{
        name: 'oponenetetete',
        game: '0123456789',
      }}
    />
  ));
