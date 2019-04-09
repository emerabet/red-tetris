import { Reducer } from 'redux-testkit';
import gameReducer from '../gameReducer';
import * as gameActions from '../../actions/gameActions';
import { getType } from 'typesafe-actions';

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
    Reducer(gameReducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });
  
  it('should start game', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.START),
        payload: {
          room: 'test',
          player: 'test',
        },}).toReturnState({...initialState, room: 'test',
        player: 'test'});
  });

  it('should reset game', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.RESET)}).toReturnState({...initialState});
  });

  it('should end game', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.END),
        }).toReturnState({...initialState, started: false});
  });

  it('should update game state', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.UPDATE_STATE),
        payload: {
            state: {
                grid: [[]],
                level: 0,
                pieces: '',
                score: 0,
                spectre: '0000000000',
              }
        },}).toReturnState({...initialState, started: true, state: {
            grid: [[]],
            level: 0,
            pieces: '',
            score: 0,
            spectre: '0000000000',
          }});
  });

  it('should update spectre', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.UPDATE_SPECTRE),
        payload: {
          spectre: {
            id: 'oponent 1',
            spectre: '0123456789',
            username: 'aaaaa',
          }
        },}).toReturnState({...initialState, spectres: [{
            id: 'oponent 1',
            spectre: '0123456789',
            username: 'aaaaa',
          }]});
  });

  it('should update players', () => {
    Reducer(gameReducer).expect({type: getType(gameActions.UPDATE_PLAYERS),
        payload: {
            count: 2,
            username: 'test',
            action: 'test',
        },}).toReturnState({...initialState, count: 2,
            username: 'test',
            action: 'test',});
  });

  it('should not add', () => {

    // it's empty on purpose because it's just starting to fetch posts
    expect(gameReducer({...initialState, spectres: [{
      id: 'oponent 1',
      spectre: '0123456789',
      username: 'aaaaa',
    }]}, {type: getType(gameActions.UPDATE_SPECTRE),
        payload: {
          spectre: {
            id: 'oponent 1',
            spectre: '0123456789',
            username: 'aaaaa',
          }
        },})).toEqual({...initialState, spectres: [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }]});
  });

});
