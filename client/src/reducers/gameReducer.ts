import { getType } from 'typesafe-actions';
import * as gameActions from '../actions/gameActions';
import { GameAction, GameState, StateBoardI } from '../types/gameTypes';

const initialState: GameState = {
  started: false,
  room: '',
  player: '',
  board: [],
  piece: [],
  pieceIndex: 0,
  position: {
    x: 4,
    y: 0,
  },
  state: {
    grid: [],
    level: 0,
    pieces: '',
    score: 0,
    spectre: '0000000000',
  },
};

export default function (state: GameState = initialState, action: any /*GameAction*/) {
  switch (action.type) {
    case getType(gameActions.RESET):
      console.log("REDUCER RESET")
      return initialState;
    case getType(gameActions.START):
      console.log("REDUCER START")
      return {
        ...state,
        started: true,
        ...action.payload,
      };
    case getType(gameActions.END):
      console.log("REDUCER END")
      return {
        ...state,
        started: false,
      };
    // case getType(gameActions.ROTATE):
    //     console.log("REDUCER ROTATE")
    //     return {
    //         ...state,
    //         ...action.payload
    //     };
    // case getType(gameActions.MOVE_DOWN):
    //     console.log("REDUCER MOVE DOWN")
    //     return {
    //         ...state,
    //         ...action.payload
    //     };
    case getType(gameActions.UPDATE_BOARD):
      return {
        ...state,
        ...action.payload,
      };
    case getType(gameActions.UPDATE_STATE):
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
