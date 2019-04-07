import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { updateState, updateSpectre, updatePlayers } from '../../actions/gameActions';
import { StateBoardI, SpectreI } from '../../types/gameTypes';

interface Props {
  socket: any;
  updateState: Function;
  updateSpectre: Function;
  updatePlayers: Function;
}

const UseSocket: React.SFC<Props> = (props) => {
  props.socket.on('state', (state: StateBoardI) => {
    props.updateState(state);
  });

  props.socket.on('spectre', (spectre:SpectreI) => {
    console.log(spectre)
    props.updateSpectre(spectre);
  });

  props.socket.on('update_game_state', (count: number, username: string, action: string) => {
    props.updatePlayers(count, username, action);
  });

  return (<div></div>);
};

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateState: (state:StateBoardI) => dispatch(updateState(state)),
  updateSpectre: (spectre:SpectreI) => dispatch(updateSpectre(spectre)),
  updatePlayers: (count:number, username: string, action: string) =>
  dispatch(updatePlayers(count, username, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UseSocket);
