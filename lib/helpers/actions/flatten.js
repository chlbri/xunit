"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
const checkers_1 = require("../checkers");
function flatten(value) {
    const out = [];
    if ((0, checkers_1.hasChildrenStates)(value)) {
        const states = Object.values(value.states);
        out.push(value, ...states.map(flatten).reduce((acc, curVal) => {
            return acc.concat(curVal);
        }));
    }
    else {
        out.push(value);
    }
    return out;
}
exports.flatten = flatten;
