import React from 'react';
import { storiesOf } from '@storybook/react';
import NextPieces from './NextPieces';
import * as utils from '../../Utils/constants';

storiesOf('NextPieces', module)
  .add('next pieces', () => (
    <NextPieces
      pieces={[
        utils.SAHPES_T[0],
        utils.SHAPES_I[0],
        utils.SHAPES_Z[0]]}
    />
  ));
