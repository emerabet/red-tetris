import { ActionType } from "typesafe-actions";
import * as gameActions from "../actions/gameActions";
import { posix } from "path";

export type GameAction = ActionType<typeof gameActions>;

export interface position {
    x: number,
    y: number,
}

export interface GameState {
    started: boolean;
    room: string;
    player: string;
    board: number[][];
    piece: number[][][];
    pieceIndex: number;
    position: position;
}
