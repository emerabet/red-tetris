import { take, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getType, action } from "typesafe-actions";
import * as gameActions from "../../actions/gameActions";
import { CellState, From } from '../../Logic/constants';
import * as constants_1 from '../../Logic/constants';
import { position } from '../../types/gameTypes';

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

function cleanSpace(b: number[][], piece: number[][], position: position): number[][] {
    let board: number[][] = b.map(function (arr) {
        return arr.slice();
    });
    let ypiece = piece.length - 1;
    for (let y = position.y; y >= 0 && ypiece >= 0; y--) {
        //console.log("Y", y, ypiece, piece[ypiece], board[y])
        console.log("PPP")
        let xpiece = 0;
        console.log("POSX", position.x, xpiece)
        console.log("POSY", position.y, ypiece, y)
        for (let x = position.x; x < board[0].length && xpiece < piece[0].length; x++) {
            console.log("CLEAN", x, y)
            board[y][x] = 0;
            xpiece++;
        }
        ypiece--;
    }
    console.log("CLEANED", board)
    return board;
}

export function* moveDown(action: any) {
    console.log("MMMMM")
    let board: number[][] = action.board.map(function (arr: number[]) {
        return arr.slice();
    });
    const piece: number[][] = action.piece[action.pieceIndex];
    const position = {
        x: action.position.x,
        y: action.position.y,// < 19 ? action.position.y + 1 : 19,
    }
    let stop: boolean = false;
    let ypiece = piece.length - 1;
    console.log("YPIECE", piece.length);
    console.log("ACTION POSITION Y", action.position.y)
    for (let y = action.position.y; y >= 0 && ypiece >= 0; y--) {
        console.log("Y", y, ypiece, piece[ypiece], board[y])
        for (let x = action.position.x; x < piece[0].length; x++) {
            if (board[y][x] !== 0 && piece[ypiece][x] !== 0) {
                stop = true;
            }
        }
        ypiece--;
    }
    if (position.y >= 19) {
        stop = true;
    }
    console.log("XPIECE", piece[0].length)
    if (stop === false) {
        //cleaning
        // ypiece = piece.length - 1;
        // for (let y = position.y; y >= 0 && ypiece >= 0; y--) {
        //     //console.log("Y", y, ypiece, piece[ypiece], board[y])
        //     console.log("PPP")
        //     let xpiece = 0;
        //     console.log("POSX", position.x, xpiece)
        //     console.log("POSY", position.y, ypiece, y)
        //     for (let x = position.x; x < board[0].length && xpiece < piece[0].length; x++) {
        //         console.log("CLEAN", x, y, board[y][x])
        //         board[y][x] = -9;
        //         console.log("AFTER CLEAN", x, y, board[y][x], board)
        //         xpiece++;
        //     }
        //     ypiece--;
        // }
        console.log("OKKKk////////////////////////////////////////////////////k")
        position.y++;
        ypiece = piece.length - 1;
        for (let y = action.position.y; y >= 0 && ypiece >= -1; y--) {
            //console.log("Y", y, ypiece, piece[ypiece], board[y])
            console.log("PPP")
            let xpiece = 0;
            console.log("POSX", action.position.x)
            console.log("POSY", action.position.y)
            for (let x = action.position.x; x < board[0].length && xpiece < piece[0].length; x++) {
                console.log("IN HEERE", piece[ypiece], x, y)
                console.log("BOARDL", board[0].length, x)
                console.log("xp", xpiece)
                console.log("yp", ypiece)
                if (ypiece === -1) {
                    board[y][x] = 0;
                } else {
                    board[y][x] = piece[ypiece][xpiece];
                }
                xpiece++;
            }
            ypiece--;
        }
    } else {
        // freeze piece
        console.log("FREEZE")
    }

    console.log("BOARD", board)

    //const pieceIndex = yield action.pieceIndex < 3 ? action.pieceIndex + 1 : 0;
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
