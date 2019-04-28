import { getType } from 'typesafe-actions';
import * as gameActions from '../actions/gameActions';
import { GameState } from '../types/gameTypes';

export const initialState: GameState = {
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

export default function (state: GameState = initialState, action: any) {
  switch (action.type) {
    case getType(gameActions.RESET):
      return initialState;
    case getType(gameActions.START):
      return {
        ...state,
        ...action.payload,
      };
    case getType(gameActions.END):
      return {
        ...state,
        started: false,
      };
    case getType(gameActions.UPDATE_STATE):
      return {
        ...state,
        started: true,
        ...action.payload,
      };
    case getType(gameActions.UPDATE_SPECTRE):
      const spectres = [...state.spectres];
      const index = spectres.findIndex(s => s.id === action.payload.spectre.id);
      if (index >= 0) {
        spectres[index].spectre = action.payload.spectre.spectre;
      } else {
        spectres.push(action.payload.spectre);
      }
      return {
        ...state,
        spectres,
      };
    case getType(gameActions.UPDATE_PLAYERS):
      const spectresUpdate = [...state.spectres];
      if (action.payload.action === 'left') {
        const index = spectresUpdate.findIndex(s => s.id === action.payload.id);
        if (index >= 0) {
          spectresUpdate.splice(index, 1);
        }
      }
      return {
        ...state,
        ...action.payload,
        spectres: spectresUpdate,
      };

    default:
      return state;
  }
}
