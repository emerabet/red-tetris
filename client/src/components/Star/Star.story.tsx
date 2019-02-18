import React from 'react';
import { storiesOf } from '@storybook/react';
import Star from './Star';

storiesOf('Star', module)
    .add('svg', () => (
        <Star />
    ));
