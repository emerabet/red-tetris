import {endGame, startGame} from '../gameSaga';
import * as gameActions from '../../../actions/gameActions';
import { put } from 'redux-saga/effects';

test('end game saga', () => {
  expect(endGame().next().value).toEqual(put(gameActions.endGame()));
});

test('start game saga', () => {
    expect(startGame({room: 'aaa', player: 'bbb'}).next().value).toEqual(put(gameActions.startGame('aaa', 'bbb')));
  });