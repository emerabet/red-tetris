import { all, fork } from "redux-saga/effects";
import gameSaga from "./gameSaga";

function* rootSaga() {
    console.log("ROOT SAGA")
    yield all([fork(gameSaga)]);
}

export default rootSaga;
