import { take, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getType, action } from "typesafe-actions";
import * as gameActions from "../../actions/gameActions";
import { CellState, From } from '../../Logic/constants';

function createBoard(): number[][] {
    const board: number[][] = [];
    const height = 20;
    const width = 10;
    for (let i = 0; i < height; i += 1) {
        addRow(board, CellState.Empty, From.Bottom, width);
    }
    return board;
}

function addRow(board: number[][],state: CellState, from: From, width: number): void {
    const arr:number[] = [];
    arr.length = width;
    arr.fill(state);
    if (from === From.Bottom) {
        board.push(arr);
    } else {
        board.unshift(arr);
    }
}

export function* startGame(action:any) {
    const board: number[][] = yield createBoard();
    console.log("BOARD", board)
    yield put(gameActions.startGame(action.room, action.player, board));
};

export function* endGame() {
    yield put(gameActions.endGame());
};

function* gameSaga() {
  //  while (true) {
        yield takeLatest(getType(gameActions.START_SAGA), startGame);
        yield takeLatest(getType(gameActions.END_SAGA), endGame);
       // yield take(actions.END_SAGA);
       // console.log("TOOK")
  //  }
}

export default gameSaga;
