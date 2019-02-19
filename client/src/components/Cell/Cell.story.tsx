import React from 'react';
import { storiesOf } from '@storybook/react';
import Cell from './Cell';

storiesOf('Cell', module)
   .add('normal', () => (
      <Cell
       color={3}
       index={2}
      />
   ));
