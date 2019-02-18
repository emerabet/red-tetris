import React from 'react';
import { storiesOf } from '@storybook/react';
import Home from './Home';

storiesOf('Home', module)
    .add('empty', () => (
        <Home
            room=""
            player=""
            play={(_) => { return 'void'; }}
            handleChange={(_) => { return 'void'; }}
        />
    ))
    .add('full', () => (
        <Home
            room="my room"
            player="my name"
            play={(_) => { return 'void'; }}
            handleChange={(_) => { return 'void'; }}
        />
    ));
