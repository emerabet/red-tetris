"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["Down"] = 0] = "Down";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Top"] = 3] = "Top";
})(Direction = exports.Direction || (exports.Direction = {}));
var From;
(function (From) {
    From[From["Top"] = 0] = "Top";
    From[From["Bottom"] = 1] = "Bottom";
})(From = exports.From || (exports.From = {}));
var CellState;
(function (CellState) {
    CellState[CellState["Empty"] = 0] = "Empty";
    CellState[CellState["Locked"] = -1] = "Locked";
})(CellState = exports.CellState || (exports.CellState = {}));
exports.Z = 'Z';
exports.S = 'S';
exports.J = 'J';
exports.L = 'L';
exports.T = 'T';
exports.I = 'I';
exports.O = 'O';
exports.SHAPES_Z = [
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
exports.SHAPES_S = [
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
exports.SHAPES_J = [
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
exports.SHAPES_L = [
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
exports.SAHPES_T = [
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
exports.SHAPES_I = [
    [
        [0, 0, 0, 0],
        [6, 6, 6, 6],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 6, 0],
        [0, 0, 6, 0],
        [0, 0, 6, 0],
        [0, 0, 6, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [6, 6, 6, 6],
        [0, 0, 0, 0],
    ],
    [
        [0, 6, 0, 0],
        [0, 6, 0, 0],
        [0, 6, 0, 0],
        [0, 6, 0, 0],
    ],
];
exports.SHAPES_O = [
    [
        [0, 0, 0, 0],
        [0, 7, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
    ],
];
