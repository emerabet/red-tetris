// import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import GamePage from "./GamePage";
import { StateType } from "typesafe-actions";
import rootReducer from "../../reducers/index";
import { startGameAsync, endGameAsync, rotateAsync, moveDownAsync, reset } from '../../actions/gameActions';

const mapStateToProps = (_state: StateType<typeof rootReducer>) => ({
  started: _state.game.started,
  room: _state.game.room,
  player: _state.game.player,
  board: _state.game.board,
  piece: _state.game.piece,
  pieceIndex: _state.game.pieceIndex,
  position: _state.game.position,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => dispatch(reset()),
  startGame: (room: string, player: string) => dispatch(startGameAsync({ room: room, player: player })),
  endGame: () => dispatch(endGameAsync()),
  rotate: (pieceIndex: number) => dispatch(rotateAsync({ pieceIndex: pieceIndex })),
  moveDown: (x: number, y: number, board: number[][], piece: number[][][], pieceIndex: number) => dispatch(moveDownAsync({ position: { x: x, y: y }, board: board, piece: piece, pieceIndex: pieceIndex })),
  //   onNavigateBtnPress: () => dispatch(NavigationActions.navigate({ routeName: "Home" })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);