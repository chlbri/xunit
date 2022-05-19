"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestActionForOn = void 0;
const types_1 = require("../types");
const reducer_1 = require("./reducer");
function createTestActionForOn(on, id) {
    const values = Object.entries(on);
    const out = {};
    values.forEach(([key, value1]) => {
        if ((0, types_1.isString)(value1)) {
            return (out[key] = value1);
        }
        if ((0, types_1.isTransition)(value1)) {
            return (out[key] = (0, reducer_1.reducerTarget)(value1, id));
        }
        const children = value1.map(value2 => {
            if ((0, types_1.isString)(value2)) {
                return value2;
            }
            return (0, reducer_1.reducerTarget)(value2, id);
        });
        out[key] = children;
    });
    return out;
}
exports.createTestActionForOn = createTestActionForOn;
