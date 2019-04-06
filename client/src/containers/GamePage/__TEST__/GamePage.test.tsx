import React from 'react';

import renderer from 'react-test-renderer';
import GamePage from '../GamePage';
import socketIOClient from 'socket.io-client';
import socketUrl from '../../../config/default';

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
      socket={socketIOClient(socketUrl)}
      board={[[]]}
      startGame={() => { }}
      endGame={() => { }}
      resetGame={() => { }}
      spectres={
        [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }, {
          id: 'oponent 2',
          spectre: '0123456789',
          username: 'bbb',
        }]
      }
    />).toJSON();
  expect(gamePage).toMatchSnapshot();
});
