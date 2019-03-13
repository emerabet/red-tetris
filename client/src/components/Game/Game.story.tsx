import React from 'react';
import { storiesOf } from '@storybook/react';
import Game from './Game';

storiesOf('Game', module)
  .add('empty', () => (
    <Game
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
      oponents={[{
        name: 'oponent 1',
        game: '0123456789',
      },
      {
        name: 'booo',
        game: '4444333345',
      },
      {
        name: 'pop',
        game: '88AAJJIIIJ',
      }, {
        name: 'bobo',
        game: '0040565600',
      }]}
      status="start"
      pieces="ZOL"
    />
  )).add('game', () => (
    <Game
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
      oponents={[{
        name: 'oponent 1',
        game: '0123456789',
      },
      {
        name: 'booo',
        game: '4444333345',
      },
      {
        name: 'pop',
        game: '88AAJJIIIJ',
      }, {
        name: 'bobo',
        game: '0040565600',
      }]}
      status="restart"
      pieces="ZOL"
    />
  )).add('malus', () => (
    <Game
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
      oponents={[{
        name: 'oponent 1',
        game: '0123456789',
      },
      {
        name: 'booo',
        game: '4444333345',
      },
      {
        name: 'pop',
        game: '88AAJJIIIJ',
      }, {
        name: 'bobo',
        game: '0040565600',
      }]}
      status="start"
      pieces="ZOL"
    />
  ));
