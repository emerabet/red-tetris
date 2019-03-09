import { take, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType, action } from 'typesafe-actions';
import * as gameActions from '../../actions/gameActions';
import { CellState, From } from '../../Logic/constants';
import * as constants_1 from '../../Logic/constants';
import { Position } from '../../types/gameTypes';

const shapes = {
  [constants_1.Z]: [...constants_1.SHAPES_Z],
  [constants_1.S]: [...constants_1.SHAPES_S],
  [constants_1.J]: [...constants_1.SHAPES_J],
  [constants_1.L]: [...constants_1.SHAPES_L],
  [constants_1.T]: [...constants_1.SAHPES_T],
  [constants_1.I]: [...constants_1.SHAPES_I],
  [constants_1.O]: [...constants_1.SHAPES_O],
};

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
  const keys = Object.keys(shapes);
  return shapes[keys[keys.length * Math.random() << 0]];
}

export function* startGame(action: any) {
  const board: number[][] = yield createBoard();
  const piece: number[][][] = yield randomPiece();
  yield put(gameActions.startGame(action.room, action.player/*, board, piece*/));
}

export function* endGame() {
  yield put(gameActions.endGame());
}

export function* rotate(action: any) {
  const pieceIndex = yield action.pieceIndex < 3 ? action.pieceIndex + 1 : 0;
  yield put(gameActions.rotate(pieceIndex));
}

export function* moveDown(action: any) {
  const board: number[][] = action.board.map((arr: number[]) => {
    return arr.slice();
  });
  const piece: number[][] = action.piece[action.pieceIndex];
  const position = {
    x: action.position.x,
    y: action.position.y,
  };
  let stop: boolean = false;
  let ypiece = piece.length - 1;

  for (let y = action.position.y; y >= 0 && ypiece >= 0; y -= 1) {
    for (let x = action.position.x; x < piece[0].length; x += 1) {
      if (board[y][x] !== 0 && piece[ypiece][x] !== 0) {
        stop = true;
      }
    }
    ypiece -= 1;
  }
  if (position.y >= 19) {
    stop = true;
  }

  if (stop === false) {
    position.y += 1;
    ypiece = piece.length - 1;
    for (let y = action.position.y; y >= 0 && ypiece >= -1; y -= 1) {
      let xpiece = 0;
      for (let x = action.position.x; x < board[0].length && xpiece < piece[0].length; x += 1) {
        if (ypiece === -1) {
          board[y][x] = 0;
        } else {
          board[y][x] = piece[ypiece][xpiece];
        }
        xpiece += 1;
      }
      ypiece -= 1;
    }
  } else {
  }

  yield put(gameActions.moveDown(position, board));
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
