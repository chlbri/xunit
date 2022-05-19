"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMachineForTests = void 0;
const xstate_1 = require("xstate");
const addRecursiveTestAction_1 = require("./addRecursiveTestAction");
const helpers_1 = require("./helpers");
function transformMachineForTests(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
machine) {
    const _genratedIDs = (0, helpers_1.generateIds)(machine.config);
    const config = (0, addRecursiveTestAction_1.addRecursiveTestAction)(_genratedIDs);
    const parallelsWithChildren = (0, helpers_1.collectGrandChildFromParallelRecursive)(_genratedIDs);
    const options = machine.options;
    const out = (0, xstate_1.createMachine)({ context: {}, ...config }, options);
    if (!(0, helpers_1.isObject)(out.context)) {
        throw 'Context must be an object';
    }
    return { machine: out, parallelsWithChildren };
}
exports.transformMachineForTests = transformMachineForTests;
