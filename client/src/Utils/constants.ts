export enum Direction {
  Down,
  Left,
  Right,
  Top,
}

export enum From {
  Top,
  Bottom,
}

export enum CellState {
  Empty = 0,
  Locked = -1,
}

export const Z: string = 'Z';
export const S: string = 'S';
export const J: string = 'J';
export const L: string = 'L';
export const T: string = 'T';
export const I: string = 'I';
export const O: string = 'O';

export const SHAPES_Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

export const SHAPES_S = [
  [
    [0, 2, 2],
    [2, 2, 0],
    [0, 0, 0],
  ],
  [
    [0, 2, 0],
    [0, 2, 2],
    [0, 0, 2],
  ],
  [
    [0, 0, 0],
    [0, 2, 2],
    [2, 2, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 0],
    [0, 2, 0],
  ],
];

export const SHAPES_J = [
  [
    [3, 0, 0],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [0, 3, 3],
    [0, 3, 0],
    [0, 3, 0],
  ],
  [
    [0, 0, 0],
    [3, 3, 3],
    [0, 0, 3],
  ],
  [
    [0, 3, 0],
    [0, 3, 0],
    [3, 3, 0],
  ],
];

export const SHAPES_L = [
  [
    [0, 0, 4],
    [4, 4, 4],
    [0, 0, 0],
  ],
  [
    [0, 4, 0],
    [0, 4, 0],
    [0, 4, 4],
  ],
  [
    [0, 0, 0],
    [4, 4, 4],
    [4, 0, 0],
  ],
  [
    [4, 4, 0],
    [0, 4, 0],
    [0, 4, 0],
  ],
];

export const SAHPES_T = [
  [
    [0, 5, 0],
    [5, 5, 5],
    [0, 0, 0],
  ],
  [
    [0, 5, 0],
    [0, 5, 5],
    [0, 5, 0],
  ],
  [
    [0, 0, 0],
    [5, 5, 5],
    [0, 5, 0],
  ],
  [
    [0, 5, 0],
    [5, 5, 0],
    [0, 5, 0],
  ],
];

export const SHAPES_I = [
  [
    [0, 0, 6, 0],
    [0, 0, 6, 0],
    [0, 0, 6, 0],
    [0, 0, 6, 0],
  ],
  [
    [0, 0, 0, 0],
    [6, 6, 6, 6],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 6, 0, 0],
    [0, 6, 0, 0],
    [0, 6, 0, 0],
    [0, 6, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [6, 6, 6, 6],
    [0, 0, 0, 0],
  ],
];

export const SHAPES_O = [
  [
    [0, 7, 7],
    [0, 7, 7],
  ],
];
