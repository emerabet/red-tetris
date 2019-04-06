import React from 'react';
import { storiesOf } from '@storybook/react';
import Game from './Game';

storiesOf('Game', module)
  .add('empty', () => (
    <Game
      started={true}
      level={1}
      score={999}
      board={[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}
      row={[]}
      room="SUPERROOM"
      player="BIG BOSS"
      spectres={
        [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }, {
          id: 'oponent 2',
          spectre: '0123456789',
          username: 'bbb',
        }]
      }
      pieces="ZOL"
      play={() => 'void'}
      count={2}
      username="test"
      action="jpinec"
    />
  )).add('game', () => (
    <Game
      started={true}
      level={2}
      score={88}
      board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
      [0, 5, 0, 0, 0, 4, 0, 0, 0, 0],
      [5, 5, 5, 4, 4, 4, 0, 0, 0, 0]]}
      row={[4]}
      room="SUPERROOM"
      player="BIG BOSS"
      spectres={
        [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }, {
          id: 'oponent 2',
          spectre: '0123456789',
          username: 'bbb',
        }]
      }
      pieces="ZOL"
      play={() => 'void'}
      count={2}
      username="test"
      action="jpinec"
    />
  )).add('malus', () => (
    <Game
      started={true}
      level={3}
      score={97}
      board={[[0, 0, 0, 3, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}
      row={[4]}
      room="SUPERROOM"
      player="BIG BOSS"
      spectres={
        [{
          id: 'oponent 1',
          spectre: '0123456789',
          username: 'aaaaa',
        }, {
          id: 'oponent 2',
          spectre: '0123456789',
          username: 'bbb',
        }]
      }
      pieces="ZOL"
      play={() => 'void' }
      count={2}
      username="test"
      action="jpinec"
    />
  ));
