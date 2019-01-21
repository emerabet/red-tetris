import { ActionType } from "typesafe-actions";
import * as gameActions from "../actions/gameActions";

export type GameAction = ActionType<typeof gameActions>;

export interface GameState {
    started: boolean;
    room: string;
    player: string;
    board: number[][];
}

export type GameStore = {
    game: {
        started: boolean,
        room: string,
        player: string,
        board: number[][],
    }
}