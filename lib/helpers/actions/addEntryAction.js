"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntryAction = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fsf_1 = require("@bemedev/fsf");
const testAction_1 = require("../testAction");
const types_1 = require("../types");
const machine = (0, fsf_1.createFunction)({
    context: {},
    schema: {
        context: {},
        args: {},
    },
    initial: 'idle',
    states: {
        idle: {
            type: 'sync',
            transitions: [
                {
                    target: 'checkExistence',
                    actions: ['assignId', 'buildEntry'],
                },
            ],
        },
        checkExistence: {
            type: 'sync',
            transitions: [
                {
                    conditions: 'isDefined',
                    target: 'compute',
                },
                {
                    target: fsf_1.FINAL_TARGET,
                },
            ],
        },
        compute: {
            type: 'sync',
            transitions: [
                {
                    conditions: 'isArray',
                    target: fsf_1.FINAL_TARGET,
                    actions: 'computeArray',
                },
                {
                    actions: 'computeSingle',
                    target: fsf_1.FINAL_TARGET,
                },
            ],
        },
    },
    data: (ctx, { ...rest }) => {
        return { ...rest, ...ctx };
    },
}, {
    actions: {
        assignId(context, event) {
            context.id = event.id;
        },
        buildEntry(context, args) {
            var _a;
            context.entry = [(0, testAction_1.testAction)((_a = args.id) !== null && _a !== void 0 ? _a : 'unknown')];
            // if (!isParallel(args)) {
            // context.entry.push(testAction(args.id ?? 'unknown'));
            // }
        },
        computeArray(context, args) {
            context.entry.unshift(...args.entry);
        },
        computeSingle(context, args) {
            context.entry.unshift(args.entry);
        },
    },
    conditions: {
        isArray(_, args) {
            return (0, types_1.isArray)(args.entry);
        },
        isDefined(_, args) {
            return !!args.entry;
        },
    },
});
exports.addEntryAction = (0, fsf_1.serve)(machine);
