import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayerLabel from './PlayerLabel';

storiesOf('PlayerLabel', module)
  .add('player', () => (
    <PlayerLabel />
  ));
