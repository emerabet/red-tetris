import React from 'react';
import { storiesOf } from '@storybook/react';
import Score from './Score';

storiesOf('Score', module)
   .add('999', () => (
      <Score
        level={4}
        score={999}
      />
   ));
