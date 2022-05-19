"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addActions = void 0;
const types_1 = require("../types");
function addActions(action, actions) {
    if ((0, types_1.isString)(actions)) {
        return [actions, action];
    }
    if (actions instanceof Array) {
        return [...actions, action];
    }
    return action;
}
exports.addActions = addActions;
