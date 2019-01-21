import { getType } from "typesafe-actions";
import * as actions from "./actions";
import { GameAction, GameState } from "./types";

const initialState: GameState = {
    started: false,
};

export default function (state: GameState = initialState, action: GameAction) {
    switch (action.type) {
        case getType(actions.START):
            console.log("REDUCER START")
            return {
                ...state,
                started: true
            };
        case getType(actions.END):
            console.log("REDUCER END")
            return {
                ...state,
                started: false
            };

        default:
            return state;
    }
}
