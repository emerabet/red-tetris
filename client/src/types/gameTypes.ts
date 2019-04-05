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
  state: StateBoardI;
  spectres: SpectreI[];
  count: number;
  username: string;
  action: string;
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

export interface SpectreI {
  id: string;
  spectre: string;
  username?: string;
}
