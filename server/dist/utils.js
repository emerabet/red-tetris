"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepCopy(array) {
    const tab = array.map((itm) => {
        return itm.map((value) => {
            return value;
        });
    });
    return tab;
}
exports.deepCopy = deepCopy;
