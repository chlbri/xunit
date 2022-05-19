"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducerTarget = void 0;
const actions_1 = require("../actions");
const testAction_1 = require("../testAction");
function reducerTarget(transition, id) {
    const _actions = transition.actions;
    const target = transition.target;
    if (target) {
        const actions = _actions;
        return {
            target,
            actions,
        };
    }
    const actions = (0, actions_1.addActions)((0, testAction_1.testAction)(id), _actions);
    return {
        actions,
    };
}
exports.reducerTarget = reducerTarget;
