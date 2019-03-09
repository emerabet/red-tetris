import React from 'react';
import { storiesOf } from '@storybook/react';
import GamePage from './GamePage';
import socketIOClient from 'socket.io-client';

storiesOf('GamePage', module)
  .add('start', () => (
    <GamePage
      nagivation={null}
      history={null}
      socket={socketIOClient('http://localhost:4000')}
      board={[[]]}
      startGame={() => { }}
      endGame={() => { }}
      resetGame={() => { }}
      status="start"
      oponents={
        [{
          name: 'oponent 1',
          game: '0123456789',
        }]
      }
    />
  ));
