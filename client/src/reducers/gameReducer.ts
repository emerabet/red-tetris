import { getType } from "typesafe-actions";
import * as gameActions from "../actions/gameActions";
import { GameAction, GameState } from "../types/gameTypes";

const initialState: GameState = {
    started: false,
    room: "",
    player: "",
    board: [],
};

export default function (state: GameState = initialState, action:any /*GameAction*/) {
    switch (action.type) {
        case getType(gameActions.START):
            console.log("REDUCER START")
            console.log("ACTION", action)
            return {
                ...state,
                ...action.payload
            };
        case getType(gameActions.END):
            console.log("REDUCER END")
            return {
                ...state,
                started: false
            };

        default:
            return state;
    }
}
