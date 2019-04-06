import React from 'react';
import { storiesOf } from '@storybook/react';
import SquareLabel from './SquareLabel';

storiesOf('SquareLabel', module)
  .add('player', () => (
    <SquareLabel label="RTETest12345678 9:" />
  ));
