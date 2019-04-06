import { all, fork } from "redux-saga/effects";
import gameSaga from "./gameSaga";

function* rootSaga() {
    yield all([fork(gameSaga)]);
}

export default rootSaga;
