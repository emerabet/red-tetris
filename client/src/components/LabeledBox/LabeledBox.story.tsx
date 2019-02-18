import React from 'react';
import { storiesOf } from '@storybook/react';
import LabeledBox from './LabeledBox';

storiesOf('LabeledBox', module)
    .add('empty', () => (
        <LabeledBox
            label="room"
            content="super room"
        />
    ));
