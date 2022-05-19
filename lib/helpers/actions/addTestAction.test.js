"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@bemedev/test");
const addTestAction_1 = require("./addTestAction");
const testAction_1 = require("../testAction");
describe('Always', () => {
    test_1.ttest.concurrent({
        func: addTestAction_1.addTestAction,
        tests: [
            {
                invite: '#1',
                args: { always: 'target1' },
                expected: {
                    always: 'target1',
                },
            },
            {
                invite: '#2',
                args: { always: 'target2' },
                expected: {
                    always: 'target2',
                },
            },
            {
                invite: '#3',
                args: { always: { target: 'target3' } },
                expected: {
                    always: {
                        target: 'target3',
                    },
                },
            },
            {
                invite: '#4',
                args: { always: { actions: 'action4' } },
                expected: {
                    always: {
                        actions: ['action4', (0, testAction_1.testAction)('key')],
                    },
                },
                // compare: dataCompare,
            },
            {
                invite: '#5',
                args: {
                    always: [
                        { target: 'target4a', actions: 'action4a' },
                        { actions: 'action4b' },
                    ],
                },
                expected: {
                    always: [
                        {
                            target: 'target4a',
                            actions: 'action4a',
                        },
                        {
                            actions: ['action4b', (0, testAction_1.testAction)('key')],
                        },
                    ],
                },
                compare: test_1.dataCompare,
            },
        ],
        compare: test_1.shallowCompare,
    });
});
describe('On', () => {
    test_1.ttest.concurrent({
        func: addTestAction_1.addTestAction,
        tests: [
            {
                invite: '#1',
                args: {
                    on: {
                        DEBT: 'debt',
                        CREDIT: 'credit',
                    },
                },
                expected: {
                    on: {
                        DEBT: 'debt',
                        CREDIT: 'credit',
                    },
                },
            },
            {
                invite: '#2',
                args: {
                    on: {
                        CREDIT: { target: 'credit', actions: 'action2' },
                    },
                },
                expected: {
                    on: {
                        CREDIT: {
                            target: 'credit',
                            actions: 'action2',
                        },
                    },
                },
                compare: test_1.dataCompare,
            },
            {
                invite: '#3',
                args: {
                    on: {
                        CREDIT: { actions: 'action2' },
                    },
                },
                expected: {
                    on: {
                        CREDIT: {
                            actions: ['action2', (0, testAction_1.testAction)('key')],
                        },
                    },
                },
                compare: test_1.dataCompare,
            },
            {
                invite: '#4',
                args: {
                    after: {
                        150: [
                            { target: 'target4a', actions: 'action4a' },
                            { actions: ['action4b', 'action4c'] },
                            'target4b',
                        ],
                    },
                },
                expected: {
                    after: {
                        150: [
                            {
                                target: 'target4a',
                                actions: 'action4a',
                            },
                            {
                                actions: ['action4b', 'action4c', (0, testAction_1.testAction)('key1')],
                            },
                            'target4b',
                        ],
                    },
                },
            },
        ],
    });
});
describe('After', () => {
    test_1.ttest.concurrent({
        func: addTestAction_1.addTestAction,
        tests: [
            {
                invite: '#1',
                args: {
                    after: {
                        time1: 'debt',
                        time2: 'credit',
                    },
                },
                expected: {
                    after: {
                        time1: 'debt',
                        time2: 'credit',
                    },
                },
            },
            {
                invite: '#2',
                args: {
                    after: {
                        CREDIT: { target: 'credit', actions: 'action2' },
                    },
                },
                expected: {
                    after: {
                        CREDIT: {
                            target: 'credit',
                            actions: 'action2',
                        },
                    },
                },
            },
            {
                invite: '#3',
                args: {
                    after: {
                        300: 'paypal',
                        400: {
                            actions: 'action3',
                        },
                    },
                },
                expected: {
                    after: {
                        300: 'paypal',
                        400: {
                            actions: ['action3', (0, testAction_1.testAction)('key')],
                        },
                    },
                },
                compare: test_1.dataCompare,
            },
            {
                invite: '#4',
                args: {
                    on: {
                        GO: [
                            { target: 'target4a', actions: 'action4a' },
                            { actions: 'action4b' },
                            'target4b',
                        ],
                    },
                },
                expected: {
                    on: {
                        GO: [
                            {
                                target: 'target4a',
                                actions: 'action4a',
                            },
                            {
                                actions: ['action4b', (0, testAction_1.testAction)('key')],
                            },
                            'target4b',
                        ],
                    },
                },
                compare: test_1.dataCompare,
            },
        ],
    });
});
