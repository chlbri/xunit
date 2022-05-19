"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const test_1 = require("@bemedev/test");
const addRecursiveTestAction_1 = require("./addRecursiveTestAction");
const helpers_1 = require("./helpers");
describe('Complex tests', () => {
    test_1.ttest.concurrent({
        func: addRecursiveTestAction_1.addRecursiveTestAction,
        tests: [
            {
                invite: '#1',
                expected: {
                    states: {
                        state1: { always: 'state2', entry: [(0, helpers_1.testAction)('')] },
                        state2: { on: { GO: 'state1' }, entry: [(0, helpers_1.testAction)('')] },
                    },
                },
                args: {
                    states: {
                        state1: { always: 'state2' },
                        state2: { on: { GO: 'state1' } },
                    },
                },
            },
            {
                invite: '#2',
                args: {
                    states: {
                        state1: { always: { actions: 'action2' } },
                    },
                },
                expected: {
                    states: {
                        state1: {
                            always: {
                                actions: ['action2', (0, helpers_1.testAction)('')],
                            },
                            entry: [(0, helpers_1.testAction)('')],
                        },
                    },
                },
            },
            {
                invite: '#3',
                args: {
                    always: { actions: 'action3' },
                },
                expected: {
                    always: {
                        actions: ['action3', (0, helpers_1.testAction)('')],
                    },
                    entry: [(0, helpers_1.testAction)('')],
                },
            },
        ],
        compare: test_1.shallowCompare,
    });
});
