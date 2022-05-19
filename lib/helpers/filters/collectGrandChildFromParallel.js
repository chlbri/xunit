"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectGrandChildFromParallel = void 0;
const fsf_1 = require("@bemedev/fsf");
const checkers_1 = require("../checkers");
const getInitialID_1 = require("../getInitialID");
const collectGrandChildFromParallelMachine = (0, fsf_1.createFunction)({
    context: {
    // grandChildren: [],
    },
    schema: {
        args: {},
        context: {},
    },
    initial: 'idle',
    states: {
        idle: {
            type: 'sync',
            transitions: [
                {
                    target: 'checkingParallel',
                    actions: 'initializeGrandChildren',
                },
            ],
        },
        checkingParallel: {
            type: 'sync',
            transitions: [
                {
                    conditions: 'isParallel',
                    target: 'collecting',
                },
                {
                    target: fsf_1.FINAL_TARGET,
                },
            ],
        },
        collecting: {
            type: 'sync',
            transitions: [
                {
                    target: fsf_1.FINAL_TARGET,
                    actions: ['assignId', 'collectGrandChildren'],
                },
            ],
        },
    },
}, {
    conditions: {
        isParallel(_, event) {
            return (0, checkers_1.isParallel)(event);
        },
    },
    actions: {
        initializeGrandChildren(context) {
            context.grandChildren = [];
        },
        assignId(context, args) {
            context.id = args.id;
        },
        collectGrandChildren(context, event) {
            const states = event.states;
            if (!states) {
                throw `states are not defined for parallel state ${event.id}`;
            }
            Object.values(states).forEach(state => {
                var _a;
                const id = (0, getInitialID_1.getInitialIDForCompoundState)(state);
                if (id) {
                    (_a = context.grandChildren) === null || _a === void 0 ? void 0 : _a.push(id);
                }
            });
        },
    },
});
exports.collectGrandChildFromParallel = (0, fsf_1.serve)(collectGrandChildFromParallelMachine);
