import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import GamePage, { mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
const { store } = configureStore();
import { Provider } from 'react-redux';
import { getType } from 'typesafe-actions';
import * as gameActions from '../../../actions/gameActions';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const button = renderer.create(<Provider store={store}><GamePage
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
    /></Provider>).toJSON();
  expect(button).toMatchSnapshot();
});

describe('dispatch', () => {

  it('start game', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).startGame('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: getType(gameActions.START_SAGA),
      room: 'test',
      player: 'test',
    });
  });
  it('reset game', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).resetGame();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: getType(gameActions.RESET),
    });
  });
  it('end game', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).endGame();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: getType(gameActions.END_SAGA),
    });
  });
  it('update players', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updatePlayers(2, 'test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: getType(gameActions.UPDATE_PLAYERS),
      payload: {
        count: 2,
        username: 'test',
        action: 'test',
      },
    });
  });
});
