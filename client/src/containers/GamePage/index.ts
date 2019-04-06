import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GamePage from './GamePage';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { startGameAsync, endGameAsync, reset, updatePlayers }
  from '../../actions/gameActions';

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({
  state: state.game.state,
  started: state.game.started,
  room: state.game.room,
  player: state.game.player,
  spectres: state.game.spectres,
  count: state.game.count,
  username: state.game.username,
  action: state.game.action,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetGame: () => dispatch(reset()),
  startGame: (room: string, player: string) =>
    dispatch(startGameAsync({ room, player })),
  endGame: () => dispatch(endGameAsync()),
  updatePlayers: (count:number, username: string, action: string) =>
  dispatch(updatePlayers(count, username, action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
