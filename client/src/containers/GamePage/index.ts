import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GamePage from './GamePage';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { startGameAsync, endGameAsync, reset }
  from '../../actions/gameActions';

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({
  state: state.game.state,
  started: state.game.started,
  room: state.game.room,
  player: state.game.player,
  spectres: state.game.spectres,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetGame: () => dispatch(reset()),
  startGame: (room: string, player: string) =>
    dispatch(startGameAsync({ room, player })),
  endGame: () => dispatch(endGameAsync()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
