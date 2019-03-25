import { deepCopy } from './../utils';

const array = [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 2],
];

it('should not be the same array', () => {
    const copy = deepCopy(array);
    expect(copy).not.toBe(array);
});

it('should have the same data', () => {
    const copy = deepCopy(array);
    expect(copy).toEqual(array);
});
