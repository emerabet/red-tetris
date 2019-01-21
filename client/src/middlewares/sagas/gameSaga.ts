import { take, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getType, action } from "typesafe-actions";
import * as gameActions from "../../actions/gameActions";
import { CellState, From } from '../../Logic/constants';
import * as constants_1 from '../../Logic/constants';

const shapes = {
    [constants_1.Z]: [...constants_1.SHAPES_Z],
    [constants_1.S]: [...constants_1.SHAPES_S],
    [constants_1.J]: [...constants_1.SHAPES_J],
    [constants_1.L]: [...constants_1.SHAPES_L],
    [constants_1.T]: [...constants_1.SAHPES_T],
    [constants_1.I]: [...constants_1.SHAPES_I],
    [constants_1.O]: [...constants_1.SHAPES_O],
}

function createBoard(): number[][] {
    const board: number[][] = [];
    const height = 20;
    const width = 10;
    for (let i = 0; i < height; i += 1) {
        addRow(board, CellState.Empty, From.Bottom, width);
    }
    return board;
}

function addRow(board: number[][], state: CellState, from: From, width: number): void {
    const arr: number[] = [];
    arr.length = width;
    arr.fill(state);
    if (from === From.Bottom) {
        board.push(arr);
    } else {
        board.unshift(arr);
    }
}

function randomPiece(): number[][][] {
    var keys = Object.keys(shapes)
    return shapes[keys[keys.length * Math.random() << 0]];
}

export function* startGame(action: any) {
    const board: number[][] = yield createBoard();
    const piece: number[][][] = yield randomPiece();
    console.log("BOARD", board)
    console.log("PIECE", piece)
    yield put(gameActions.startGame(action.room, action.player, board, piece));
};

export function* endGame() {
    yield put(gameActions.endGame());
};

export function* rotate(action: any) {
    const pieceIndex = yield action.pieceIndex < 3 ? action.pieceIndex + 1 : 0;
    yield put(gameActions.rotate(pieceIndex));
}

export function* moveDown(action: any) {
    console.log("MMMMM")
    const position = {
        x: action.position.x,
        y: action.position.y < 19 ? action.position.y + 1 : 19,
    }
    //const pieceIndex = yield action.pieceIndex < 3 ? action.pieceIndex + 1 : 0;
    yield put(gameActions.moveDown(position));
}

function* gameSaga() {
    //  while (true) {
    yield takeLatest(getType(gameActions.START_SAGA), startGame);
    yield takeLatest(getType(gameActions.END_SAGA), endGame);
    yield takeEvery(getType(gameActions.ROTATE_SAGA), rotate);
    yield takeEvery(getType(gameActions.MOVE_DOWN_SAGA), moveDown);
    // yield take(actions.END_SAGA);
    // console.log("TOOK")
    //  }
}

export default gameSaga;
