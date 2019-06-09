import React from 'react';

import renderer, { act }  from 'react-test-renderer';
import Game from '../Game';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
afterAll(() => React.useEffect.mockRestore());

it('renders correctly with defaults started', () => {
  const game = renderer.create(<Game
    started={true}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
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
    pieces="ZOL"
    play={() => 'void' }
    count={2}
    username="test"
    action="jpinec"
  />).toJSON();
  expect(game).toMatchSnapshot();
});

it('renders correctly with defaults not started', () => {
  const game = renderer.create(<Game
    started={false}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
    spectres={
      [{
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      }, {
        id: 'oponent 2',
        spectre: '0123456789',
        username: 'bbb',
      },
      {
        id: 'oponent 3',
        spectre: '0123456789',
        username: 'bbb',
      }]
    }
    pieces="ZOL"
    play={() => 'void' }
    count={3}
    username="tdaest"
    action="win"
  />).toJSON();
  expect(game).toMatchSnapshot();
});

it('renders correctly with defaults', () => {
  const game = renderer.create(<Game
    started={true}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
    spectres={
      [{
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      }, {
        id: 'oponent 2',
        spectre: '0123456789',
        username: 'bbb',
      },
      {
        id: 'oponent 3',
        spectre: '0123456789',
        username: 'bbb',
      }]
    }
    pieces="ZOL"
    play={() => 'void' }
    count={3}
    username="tdaest"
    action="win"
  />).toJSON();
  expect(game).toMatchSnapshot();
});

it('renders correctly with defaults and unmount', () => {
  const button = mount((<Game
    started={true}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
    spectres={
    [{
      id: 'oponent 1',
      spectre: '0123456789',
      username: 'aaaaa',
    }, {
      id: 'oponent 2',
      spectre: '0123456789',
      username: 'bbb',
    },
      {
        id: 'oponent 3',
        spectre: '0123456789',
        username: 'bbb',
      }]
    }
    pieces="ZOL"
    play={() => 'void' }
    count={3}
    username="tdaest"
    action="win"
  />));
  button.setProps({spectres:
  [{
    id: 'oponent 1',
    spectre: '0123456789',
    username: 'aaaaa',
  }, {
    id: 'oponent 2',
    spectre: '0123456789',
    username: 'bbb',
  },
  {
    id: 'oponent 3',
    spectre: '0123456789',
    username: 'bbb',
  }], started: true});
  button.unmount();
});

it('renders correctly with defaults small screen', () => {
  act(() => {
    global.outerWidth = 200;
    global.dispatchEvent(new Event('resize'));
  });
  const game = renderer.create(<Game
    started={true}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
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
    pieces="ZOL"
    play={() => 'void' }
    count={2}
    username="test"
    action="jpinec"
  />).toJSON();
  expect(game).toMatchSnapshot();
});

it('renders correctly with defaults medium screen', () => {
  act(() => {
    global.outerWidth = 480;
    global.dispatchEvent(new Event('resize'));
  });
  const game = renderer.create(<Game
    started={true}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
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
    pieces="ZOL"
    play={() => 'void' }
    count={2}
    username="test"
    action="jpinec"
  />).toJSON();
  expect(game).toMatchSnapshot();
});

it('renders correctly with defaults big screen', () => {
  act(() => {
    global.outerWidth = 600;
    global.dispatchEvent(new Event('resize'));
  });
  const game = renderer.create(<Game
    started={true}
    level={3}
    score={97}
    board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
    room="SUPERROOM"
    player="BIG BOSS"
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
    pieces="ZOL"
    play={() => 'void' }
    count={2}
    username="test"
    action="jpinec"
  />).toJSON();
  expect(game).toMatchSnapshot();
});