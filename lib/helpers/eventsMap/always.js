"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestActionForAlways = void 0;
const types_1 = require("../types");
const reducer_1 = require("./reducer");
function createTestActionForAlways(always, id) {
    if ((0, types_1.isString)(always)) {
        return always;
    }
    if ((0, types_1.isTransition)(always)) {
        return (0, reducer_1.reducerTarget)(always, id);
    }
    return always.map(t => createTestActionForAlways(t, id));
}
exports.createTestActionForAlways = createTestActionForAlways;
