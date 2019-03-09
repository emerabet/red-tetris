// import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GamePage from './GamePage';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { startGameAsync, endGameAsync, rotateAsync, moveDownAsync, reset }
  from '../../actions/gameActions';

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({
  started: state.game.started,
  room: state.game.room,
  player: state.game.player,
  board: state.game.board,
  piece: state.game.piece,
  pieceIndex: state.game.pieceIndex,
  position: state.game.position,
  oponents: [{
    name: 'oponent 1',
    game: '0123456789',
  }],
  status: 'start',
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
// nagivation: any;
//   history: any;
//   socket: SocketIOClient.Socket;
//   /*started: boolean;*/
//   board: number[][];
//   startGame: Function;
//   endGame: Function;
//   resetGame: Function;
//   oponents: OponentInterface[];
//   status: string;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
