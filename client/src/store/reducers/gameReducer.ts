import { START } from './gameActions';

const INITIAL_STATE = {
    started: false
};

const gameReducer = (state = INITIAL_STATE, action: any) => {
    console.log("IN REDUCER")
    switch (action.type) {
        case START:
            console.log("HERE")
            return { ...state, started: true };

        default:
            return state;
    }
}

export default gameReducer;