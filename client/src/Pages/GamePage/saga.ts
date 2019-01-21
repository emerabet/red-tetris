import { take, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getType, action } from "typesafe-actions";
import * as actions from "./actions";

export function* startGame() {
    yield put(actions.startGame());
};

export function* endGame() {
    yield put(actions.endGame());
};

function* gameSaga() {
  //  while (true) {
        yield takeLatest(getType(actions.START_SAGA), startGame);
        yield takeLatest(getType(actions.END_SAGA), endGame);
       // yield take(actions.END_SAGA);
       // console.log("TOOK")
  //  }
}

export default gameSaga;
