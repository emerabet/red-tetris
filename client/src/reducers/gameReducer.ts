import { getType } from "typesafe-actions";
import * as gameActions from "../actions/gameActions";
import { GameAction, GameState } from "../types/gameTypes";

const initialState: GameState = {
    started: false,
    room: "",
    player: "",
    board: [],
    piece: [],
    pieceIndex: 0,
    position: {
        x: 4,
        y: 0,
    }
};

export default function (state: GameState = initialState, action: any /*GameAction*/) {
    switch (action.type) {
        case getType(gameActions.RESET):
            console.log("REDUCER RESET")
            console.log("ACTION", action)
            return initialState;
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
        case getType(gameActions.ROTATE):
            console.log("REDUCER ROTATE")
            console.log("ACTION", action)
            return {
                ...state,
                ...action.payload
            };
        case getType(gameActions.MOVE_DOWN):
            console.log("REDUCER MOVE DOWN")
            console.log("ACTION", action)
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
