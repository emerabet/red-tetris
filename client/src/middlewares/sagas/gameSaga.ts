import { take, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType, action } from 'typesafe-actions';
import * as gameActions from '../../actions/gameActions';
import { CellState, From } from '../../Utils/constants';

export function* startGame(action: any) {
  yield put(gameActions.startGame(action.room, action.player));
}

export function* endGame() {
  yield put(gameActions.endGame());
}

function* gameSaga() {
  yield takeLatest(getType(gameActions.START_SAGA), startGame);
  yield takeLatest(getType(gameActions.END_SAGA), endGame);
}

export default gameSaga;
