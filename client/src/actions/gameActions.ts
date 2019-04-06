import { createStandardAction, getType, createAsyncAction } from 'typesafe-actions';
import { Position, StateBoardI, SpectreI } from '../types/gameTypes';

export const RESET = createStandardAction('RESET')<void>();
export const START = createStandardAction('START')<void>();
export const END = createStandardAction('END')<void>();
export const UPDATE_STATE = createStandardAction('UPDATE_STATE')<void>();
export const UPDATE_SPECTRE = createStandardAction('UPDATE_SPECTRE')<void>();
export const UPDATE_PLAYERS = createStandardAction('UPDATE_PLAYERS')<void>();

export const START_SAGA = createStandardAction('START_SAGA')<void>();
export const END_SAGA = createStandardAction('END_SAGA')<void>();

export const reset = () => {
  return {
    type: getType(RESET),
  };
};

export const startGame = (room: String, player: String) => {
  return {
    type: getType(START),
    payload: {
      room,
      player,
    },
  };
};

export const updateState = (state: StateBoardI) => {
  return {
    type: getType(UPDATE_STATE),
    payload: {
      state,
    },
  };
};

export const updateSpectre = (spectre: SpectreI) => {
  return {
    type: getType(UPDATE_SPECTRE),
    payload: {
      spectre,
    },
  };
};

export const updatePlayers = (count: number, username: string, action: string) => {
  return {
    type: getType(UPDATE_PLAYERS),
    payload: {
      count,
      username,
      action,
    },
  };
};

export const endGame = () => {
  return {
    type: getType(END),
  };
};

interface StartArgs {
  room: string;
  player: string;
}

export const startGameAsync = (payloads: StartArgs) => {
  return {
    type: getType(START_SAGA),
    ...payloads,
  };
};

export const endGameAsync = () => {
  return {
    type: getType(END_SAGA),
  };
};
