import React from 'react';
import { storiesOf } from '@storybook/react';
import Row from './Row';

storiesOf('Row', module)
    .add('empty', () => (
        <Row
            row={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            index={3}
        />
    )).add('333', () => (
        <Row
            row={[0, 0, 0, 3, 3, 3, 0, 0, 0, 0]}
            index={3}
        />
    ));
