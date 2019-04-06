import React from 'react';
import { storiesOf } from '@storybook/react';
import AdminButton from './AdminButton';

storiesOf('AdminButton', module)
   .add('normal', () => (
      <AdminButton
        text="start"
        play={() => 'void' }
      />
   ));
