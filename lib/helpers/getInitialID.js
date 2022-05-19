"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialIDForCompoundState = void 0;
const checkers_1 = require("./checkers");
function getInitialIDForCompoundState(config) {
    var _a;
    const initial = config.initial;
    if (!initial) {
        return undefined;
    }
    const initialState = (_a = config.states) === null || _a === void 0 ? void 0 : _a[initial];
    if (!initialState) {
        return undefined;
    }
    if ((0, checkers_1.isParallel)(initialState)) {
        return undefined;
    }
    if (!initialState.initial) {
        return initialState.id;
    }
    return getInitialIDForCompoundState(initialState);
}
exports.getInitialIDForCompoundState = getInitialIDForCompoundState;
