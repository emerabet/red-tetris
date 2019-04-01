// import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GamePage from './GamePage';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { startGameAsync, endGameAsync, rotateAsync, moveDownAsync, reset }
  from '../../actions/gameActions';
import { STATUS_CODES } from 'http';

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({
  state: state.game.state,
  started: state.game.started,
  room: state.game.room,
  player: state.game.player,
  board: state.game.board,
  piece: state.game.piece,
  pieceIndex: state.game.pieceIndex,
  position: state.game.position,
  spectres: state.game.spectres,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetGame: () => dispatch(reset()),
  startGame: (room: string, player: string) =>
    dispatch(startGameAsync({ room, player })),
  endGame: () => dispatch(endGameAsync()),
  rotate: (pieceIndex: number) => dispatch(rotateAsync({ pieceIndex })),
  moveDown: (
    x: number,
    y: number,
    board: number[][],
    piece: number[][][],
    pieceIndex: number) => dispatch(moveDownAsync({
      board, piece, pieceIndex, position: { x, y },
    })),
  //   onNavigateBtnPress: () => dispatch(NavigationActions.navigate({ routeName: "Home" })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
