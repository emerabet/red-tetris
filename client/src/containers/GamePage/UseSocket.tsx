import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { updateState, updateSpectre } from '../../actions/gameActions';
import { StateBoardI, SpectreI } from '../../types/gameTypes';

interface Props {
  socket: any;
  updateState: Function;
  updateSpectre: Function;
}

const UseSocket: React.SFC<Props> = (props) => {
  props.socket.on('state', (state: StateBoardI) => {
    props.updateState(state);
  });

  props.socket.on('spectre', (spectre:SpectreI) => {
    props.updateSpectre(spectre);
  });

  return (<div></div>);
};

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateState: (state:StateBoardI) => dispatch(updateState(state)),
  updateSpectre: (spectre:SpectreI) => dispatch(updateSpectre(spectre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UseSocket);
