import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import GamePage from '../GamePage';

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