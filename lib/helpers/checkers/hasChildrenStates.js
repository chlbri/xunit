"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasChildrenStates = void 0;
const types_1 = require("../types");
function hasChildrenStates(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
value) {
    return ((0, types_1.isObject)(value) && value.states && Object.keys(value.states).length > 0);
}
exports.hasChildrenStates = hasChildrenStates;
