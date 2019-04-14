import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer, { act } from 'react-test-renderer';
import GamePage from '../GamePage';
import { access } from 'fs';
import configureStore from '../../../configureStore';
const { store } = configureStore();
import { Provider } from 'react-redux';

beforeAll(() => {
  jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);
  // window.history.pushState({}, 'test', '/');
  // window.history.pushState({}, 'test', '/#test[test]');
});
afterAll(() => React.useEffect.mockRestore());

configure({ adapter: new Adapter() });

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

it('renders correctly with defaults mount', (done:any) => {
  // act(() => {
    const mockHistory = {
      push: (url:string) => console.log(url),
    }
    const wrapper = mount((<Provider store={store}><GamePage
      state={{
        grid: [[]],
        level: 0,
        pieces: '',
        score: 0,
        spectre: '0000000000',
      }}
      nagivation={null}
      history={mockHistory}
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
      /></Provider>));
    wrapper.setProps({ username: 'test', action: 'test' });
    wrapper.find('.roomInput').simulate('focus');
    wrapper.find('.roomInput').simulate('change', { target: { value: 'Hello' } });
    wrapper.find('.roomInput').simulate('blur');
    setTimeout(
      () => {
        setTimeout(
          () => {
            wrapper.find('.playerInput').simulate('focus');
            wrapper.find('.playerInput').simulate('change', { target: { value: 'Hello' } });
            wrapper.find('.playerInput').simulate('blur');
            done();
          },
          1500,
        );
      },
      1500);
  // });
});

it('renders correctly with defaults mount', () => {
  // act(() => {
    window.history.pushState({}, 'test', '/#test[test]');

  const wrapper = shallow((<GamePage
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
    />));
  // });
});
