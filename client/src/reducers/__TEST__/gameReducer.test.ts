import { Reducer } from 'redux-testkit';
import gameReducer from '../gameReducer';
import * as gameActions from '../../actions/gameActions';
import { getType } from 'typesafe-actions';
import { GameState } from '../../types/gameTypes';

const initialState: GameState = {
  started: false,
  room: '',
  player: '',
  state: {
    grid: [],
    level: 0,
    pieces: '',
    score: 0,
    spectre: '0000000000',
  },
  spectres: [],
  count: 0,
  username: '',
  action: '',
};

describe('store/topics/reducer', () => {

  it('should have initial state', () => {
    Reducer(gameReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should start game', () => {
    expect(gameReducer(
      { ...initialState },
      {type: getType(gameActions.START),
        payload: {
          room: 'test',
          player: 'test',
        }})).toEqual({...initialState, room: 'test',
          player: 'test'});
  });

  it('should reset game', () => {
    Reducer(gameReducer).expect({ type: getType(gameActions.RESET) })
    .toReturnState({ ...initialState });
  });

  it('should end game', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.END),
    }).toReturnState({ ...initialState, started: false });
  });

  it('should update game state', () => {
    expect(gameReducer(
      { ...initialState },
      {type: getType(gameActions.UPDATE_STATE),
        payload: {
          state: {
            grid: [[]],
            level: 0,
            pieces: '',
            score: 0,
            spectre: '0000000000',
          },
        }})).toEqual({...initialState, started: true, state: {
          grid: [[]],
          level: 0,
          pieces: '',
          score: 0,
          spectre: '0000000000',
        }});
  });

  it('should update spectre', () => {
    expect(gameReducer(
      { ...initialState },
      {type: getType(gameActions.UPDATE_SPECTRE),
        payload: {
          spectre: {
            id: 'oponent 1',
            spectre: '0123456789',
            username: 'aaaaa',
          },
        }})).toEqual({...initialState, spectres: [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }]});
  });

  it('should update players', () => {
    expect(gameReducer(
      { ...initialState },
      {type: getType(gameActions.UPDATE_PLAYERS),
        payload: {
          count: 2,
          username: 'test',
          action: 'test',
        }})).toEqual({...initialState, count: 2,
          username: 'test',
          action: 'test' });
  });

  it('should not add', () => {
    expect(gameReducer({...initialState, spectres: [{
      id: 'oponent 1',
      spectre: '0123456789',
      username: 'aaaaa',
    }]},               {type: getType(gameActions.UPDATE_SPECTRE),
      payload: {
        spectre: {
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        },
      } })).toEqual({...initialState, spectres: [{
        id: 'oponent 1',
        spectre: '0123456789',
        username: 'aaaaa',
      }]});
  });
});
