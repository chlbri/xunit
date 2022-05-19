"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTestAction = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fsf_1 = require("@bemedev/fsf");
const eventsMap_1 = require("../eventsMap");
const AddTestActionMachine = (0, fsf_1.createFunction)({
    context: {
        always: undefined,
        on: undefined,
        after: undefined,
    },
    schema: {
        args: {},
        data: {},
        context: {},
    },
    initial: 'idle',
    states: {
        idle: {
            type: 'sync',
            transitions: [
                {
                    target: 'assigningContext',
                    actions: 'assignContext',
                },
            ],
        },
        assigningContext: {
            type: 'sync',
            transitions: [
                {
                    target: 'checkExistences',
                },
            ],
        },
        checkExistences: {
            type: 'sync',
            transitions: [
                {
                    conditions: 'hasAlways',
                    target: 'computeAlways',
                },
                {
                    conditions: 'hasOn',
                    target: 'computeOn',
                },
                {
                    conditions: 'hasAfter',
                    target: 'computeAfter',
                },
                {
                    target: fsf_1.FINAL_TARGET,
                },
            ],
        },
        computeAlways: {
            type: 'sync',
            transitions: [
                {
                    target: 'checkExistences',
                    actions: ['addTestActionForAlways', 'removeAlways'],
                },
            ],
        },
        computeOn: {
            type: 'sync',
            transitions: [
                {
                    target: 'checkExistences',
                    actions: ['addTestActionForOn', 'removeOn'],
                },
            ],
        },
        computeAfter: {
            type: 'sync',
            transitions: [
                {
                    target: 'checkExistences',
                    actions: ['addTestActionForAfter', 'removeAfter'],
                },
            ],
        },
    },
    data: (ctx, ev) => {
        return {
            ...ev,
            ...ctx._temp,
        };
    },
}, {
    actions: {
        assignContext: (ctx, { on, after, always }) => {
            ctx.on = on;
            ctx.after = after;
            ctx.always = always;
        },
        removeAlways: ctx => {
            ctx.always = undefined;
        },
        removeOn: ctx => {
            ctx.on = undefined;
        },
        removeAfter: ctx => {
            ctx.after = undefined;
        },
        addTestActionForAlways: (ctx, ev) => {
            var _a, _b;
            ctx._temp = {
                ...ctx._temp,
                always: (0, eventsMap_1.createTestActionForAlways)((_a = ctx.always) !== null && _a !== void 0 ? _a : 'unknown', (_b = ev.id) !== null && _b !== void 0 ? _b : 'unknown'),
            };
        },
        addTestActionForOn: (ctx, ev) => {
            var _a, _b;
            ctx._temp = {
                ...ctx._temp,
                on: (0, eventsMap_1.createTestActionForOn)((_a = ctx.on) !== null && _a !== void 0 ? _a : {}, (_b = ev.id) !== null && _b !== void 0 ? _b : 'unknown'),
            };
        },
        addTestActionForAfter: (ctx, ev) => {
            var _a, _b;
            ctx._temp = {
                ...ctx._temp,
                after: (0, eventsMap_1.createTestActionForAfter)((_a = ctx.after) !== null && _a !== void 0 ? _a : {}, (_b = ev.id) !== null && _b !== void 0 ? _b : 'unknown'),
            };
        },
    },
    conditions: {
        hasAlways: ({ always }) => {
            return !!always;
        },
        hasOn: ({ on }) => !!on,
        hasAfter: ({ after }) => !!after,
    },
});
exports.addTestAction = (0, fsf_1.serve)(AddTestActionMachine);
