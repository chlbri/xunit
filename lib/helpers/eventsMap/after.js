"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestActionForAfter = void 0;
const types_1 = require("../types");
const types_2 = require("../types");
const reducer_1 = require("./reducer");
function createTestActionForAfter(after, id) {
    const values = Object.entries(after);
    const out = {};
    values.forEach(([key, value1]) => {
        if ((0, types_1.isString)(value1)) {
            let _key = key;
            _key = parseFloat(key);
            if (isNaN(_key)) {
                _key = key;
            }
            return (out[_key] = value1);
        }
        if ((0, types_2.isTransition)(value1)) {
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
exports.createTestActionForAfter = createTestActionForAfter;
