import { createStandardAction, getType, createAsyncAction } from 'typesafe-actions';
import { Position, StateBoardI } from '../types/gameTypes';

export const RESET = createStandardAction('RESET')<void>();
export const START = createStandardAction('START')<void>();
export const END = createStandardAction('END')<void>();
export const ROTATE = createStandardAction('ROTATE')<void>();
export const MOVE_DOWN = createStandardAction('MOVE_DOWN')<void>();
export const UPDATE_BOARD = createStandardAction('UPDATE_BOARD')<void>();
export const UPDATE_STATE = createStandardAction('UPDATE_STATE')<void>();

export const START_SAGA = createStandardAction('START_SAGA')<void>();
export const END_SAGA = createStandardAction('END_SAGA')<void>();
export const ROTATE_SAGA = createStandardAction('ROTATE_SAGA')<void>();
export const MOVE_DOWN_SAGA = createStandardAction('MOVE_DOWN_SAGA')<void>();

export const reset = () => {
  return {
    type: getType(RESET),
  };
};

export const startGame = (room: String, player: String,
  /*, board: number[][], piece: number[][][]*/) => {
  return {
    type: getType(START),
    payload: {
      room,
      player,
      // board: board,
      // piece: piece,
    },
  };
};

export const updateBoard = (board: number[][]) => {
  return {
    type: getType(UPDATE_BOARD),
    payload: {
      board,
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

export const endGame = () => {
  return {
    type: getType(END),
  };
};

export const rotate = (pieceIndex: number) => {
  return {
    type: getType(ROTATE),
    payload: {
      pieceIndex,
    },
  };
};

export const moveDown = (position: Position, board: number[][]) => {
  return {
    type: getType(MOVE_DOWN),
    payload: {
      position,
      board,
    },
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

interface RotateArgs {
  pieceIndex: number;
}

export const rotateAsync = (payloads: RotateArgs) => {
  return {
    type: getType(ROTATE_SAGA),
    ...payloads,
  };
};

interface MoveDownArgs {
  position: Position;
  board: number[][];
  piece: number[][][];
  pieceIndex: number;
}

export const moveDownAsync = (payloads: MoveDownArgs) => {
  return {
    type: getType(MOVE_DOWN_SAGA),
    ...payloads,
  };
};
