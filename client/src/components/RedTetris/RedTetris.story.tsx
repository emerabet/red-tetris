import React from 'react';
import { storiesOf } from '@storybook/react';
import RedTetris from './RedTetris';

storiesOf('Title', module)
    .add('normal red tetris', () => (
        <RedTetris />
    ))
    .add('small red tetris', () => (
        <RedTetris additionalClassName="small" />
    ));
