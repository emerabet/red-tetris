import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import GamePage from '../GamePage';
import {io, serverSocket, cleanup } from './mockServer.js';
import {render} from 'react-testing-library';

configure({adapter: new Adapter()});

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
    startGame={() => { }}
    endGame={() => { }}
    resetGame={() => { }}
    started={true}
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
    />).toJSON();
  expect(gamePage).toMatchSnapshot();
});

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
    startGame={() => { }}
    endGame={() => { }}
    resetGame={() => { }}
    started = {false}
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
    />).toJSON();
  expect(gamePage).toMatchSnapshot();
});

// it('Test click event', () => {
//   const mockCallBack = jest.fn();

//   const button = shallow((<GamePage
//     state={{
//       grid: [[]],
//       level: 0,
//       pieces: '',
//       score: 0,
//       spectre: '0000000000',
//     }}
//     nagivation={null}
//     history={null}
//     startGame={mockCallBack}
//     endGame={() => { }}
//     resetGame={() => { }}
//     started = {false}
//     spectres={
//       [{
//         id: 'oponent 1',
//         spectre: '0123456789',
//         username: 'aaaaa',
//       }]
//     }
//     count={2}
//     username="test"
//     action="joined"
//     updatePlayers={() => {}}
//     />));
//   button.find('.plus').simulate('click');
//   expect(mockCallBack.mock.calls.length).toEqual(1);
// });

// import React from 'react';
// import mock-io, {serverSocket, cleanUp } from 'socket.io-client';
// import {render} from 'react-testing-library';
// import Chat from './chat';
test('App should get messages', () => {
  // first render the app
  const utils = render(<GamePage
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
    started = {false}
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
    />)

  io.connect().on('state', () => {test: 'ettet'});
  
  // then send a message
  serverSocket.emit('state', 'efgr');
  // serverSocket.emit('left');
})