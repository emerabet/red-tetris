"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./../utils");
const array = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 2],
];
it('should not be the same array', () => {
    const copy = utils_1.deepCopy(array);
    expect(copy).not.toBe(array);
});
it('should have the same data', () => {
    const copy = utils_1.deepCopy(array);
    expect(copy).toEqual(array);
});
