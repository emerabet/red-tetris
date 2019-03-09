import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';
import rootReducer from '../../reducers/index';
import { updateBoard } from '../../actions/gameActions';

interface Props {
  socket: any;
  updateBoard: Function;
}

// interface TestI {
//   board: number[][];
// }

const UseSocket: React.SFC<Props> = (props) => {
  props.socket.on('state', (board: number[][]) => {
    props.updateBoard(board);
  });

  return (<div></div>);
};

const mapStateToProps = (state: StateType<typeof rootReducer>) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateBoard: (board: number[][]) => dispatch(updateBoard(board)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UseSocket);
