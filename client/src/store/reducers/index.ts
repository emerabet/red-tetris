import { combineReducers } from 'redux';
import gameReducer from '../../Pages/GamePage/reducer';

const rootReducer = combineReducers({
    game: gameReducer
})

export default rootReducer;