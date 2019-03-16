import React from 'react';

import renderer from 'react-test-renderer';
import GamePage from '../GamePage';
import socketIOClient from 'socket.io-client';

it('renders correctly with defaults', () => {
  const gamePage = renderer.create(<GamePage
    state={{
        grid: [[]],
        level: 0,
        pieces: '',
        score: 0,
        spectre: '0000000000',
      }}
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
    />).toJSON();
  expect(gamePage).toMatchSnapshot();
});
