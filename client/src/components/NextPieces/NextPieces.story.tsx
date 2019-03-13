import React from 'react';
import { storiesOf } from '@storybook/react';
import NextPieces from './NextPieces';
import * as utils from '../../Utils/constants';

storiesOf('NextPieces', module)
  .add('next pieces', () => (
    <NextPieces
      pieces="ZOL"
    />
  ));
