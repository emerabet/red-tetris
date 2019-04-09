import { getType } from 'typesafe-actions';
import * as gameActions from '../gameActions';

test('reset action', () => {
    expect(gameActions.reset()).toEqual({
        type: getType(gameActions.RESET),
      });
  });

test('update state action', () => {
  expect(gameActions.updateState({
    grid: [[]],
    level: 0,
    pieces: '',
    score: 0,
    spectre: '0000000000',
  })).toEqual({
    type: getType(gameActions.UPDATE_STATE),
    payload: {
      state: {
        grid: [[]],
        level: 0,
        pieces: '',
        score: 0,
        spectre: '0000000000',
      },
    },
  });
});

test('update spectre action', () => {
    expect(gameActions.updateSpectre({
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      })).toEqual({
        type: getType(gameActions.UPDATE_SPECTRE),
        payload: {
          spectre: {
            id: 'oponent 1',
            spectre: '0123456789',
            username: 'aaaaa',
          },
        },
      });
});

test('update players action', () => {
    expect(gameActions.updatePlayers(2, 'test', 'test')).toEqual({
        type: getType(gameActions.UPDATE_PLAYERS),
        payload: {
          count: 2,
          username: 'test',
          action: 'test',
        },
      });
});

test('start game async action', () => {
    expect(gameActions.startGameAsync({ room: 'test', player: 'test' })).toEqual({
        type: getType(gameActions.START_SAGA),
        room: 'test',
        player: 'test',
      });
});

test('start game async action', () => {
    expect(gameActions.endGameAsync()).toEqual({
        type: getType(gameActions.END_SAGA),
      });
});
