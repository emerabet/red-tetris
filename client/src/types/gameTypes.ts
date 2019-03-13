import { ActionType } from 'typesafe-actions';
import * as gameActions from '../actions/gameActions';

export type GameAction = ActionType<typeof gameActions>;

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  started: boolean;
  room: string;
  player: string;
  board: number[][];
  piece: number[][][];
  pieceIndex: number;
  position: Position;
  state: StateBoardI;
}

export interface OponentInterface {
  name: string;
  game: string;
}

export interface StateBoardI {
  grid: number[][];
  score:number;
  level:number;
  spectre:string;
  pieces:string;
}
