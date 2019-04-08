import React from 'react';
import { storiesOf } from '@storybook/react';
import GamePage from './GamePage';

storiesOf('GamePage', module)
  .add('start', () => (
    <GamePage
      state={{
        grid: [[]],
        level: 0,
        pieces: '',
        score: 0,
        spectre: '0000000000',
      }}
      nagivation={null}
      history={null}
      startGame={() => { }}
      endGame={() => { }}
      resetGame={() => { }}
      started = {true}
      spectres={
        [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }]
      }
      count={2}
      username="test"
      action="joined"
      updatePlayers={() => {}}
    />
  ));
