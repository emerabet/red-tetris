import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { updateBoard, updateState, updateSpectre } from '../../actions/gameActions';
import { StateBoardI, SpectreI } from '../../types/gameTypes';

interface Props {
  socket: any;
  updateBoard: Function;
  updateState: Function;
  updateSpectre: Function;
}

const UseSocket: React.SFC<Props> = (props) => {
  props.socket.on('state', (state: StateBoardI) => {
    console.log('STATE', state);
    // props.updateBoard(board.grid);
    props.updateState(state);
  });

  console.log("START TEST")
  props.socket.on('spectre', (spectre:SpectreI) => {
    console.log('SPECTRE', spectre);
    // props.updateBoard(board.grid);
    // props.updateState(state);
    props.updateSpectre(spectre);
  });
  console.log("END TEST")

  return (<div></div>);
};

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateBoard: (board: number[][]) => dispatch(updateBoard(board)),
  updateState: (state:StateBoardI) => dispatch(updateState(state)),
  updateSpectre: (spectre:SpectreI) => dispatch(updateSpectre(spectre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UseSocket);
