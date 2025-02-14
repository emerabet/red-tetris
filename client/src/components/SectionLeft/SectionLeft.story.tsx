import React from 'react';
import { storiesOf } from '@storybook/react';
import SectionLeft from './SectionLeft';

storiesOf('SectionLeft', module)
   .add('room player', () => (
      <SectionLeft
         room="SUPERROOM"
         player="BIG BOSS"
         status="start"
         level={2}
         score={8}
         play={() => 'void' }
         count={2}
         username="test"
         action="joined"
      />
   ));
