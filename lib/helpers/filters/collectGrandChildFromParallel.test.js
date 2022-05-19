"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@bemedev/test");
const actions_1 = require("../actions");
const collectGrandChildFromParallel_1 = require("./collectGrandChildFromParallel");
describe('Collect', () => {
    const machine1 = (0, actions_1.generateIds)({
        type: 'parallel',
        states: {
            state1: {},
            state2: {},
            state3: {
                initial: 'state3a',
                states: {
                    state3a: {},
                    state3b: {},
                },
            },
            state4: {
                initial: 'state4a',
                states: {
                    state4a: {},
                    state4b: {},
                },
            },
        },
    });
    const machine2 = (0, actions_1.generateIds)({
        type: 'parallel',
        id: 'main',
        states: {
            child1: {
                initial: 'grandChild1_1',
                states: {
                    grandChild1_1: {},
                    grandChild2_2: {},
                },
            },
            child2: {
                initial: 'grandChild2_2',
                states: {
                    grandChild2_1: {},
                    grandChild2_2: {},
                },
            },
        },
    });
    (0, test_1.ttest)({
        func: collectGrandChildFromParallel_1.collectGrandChildFromParallel,
        tests: [
            {
                invite: '#1',
                args: machine1,
                expected: {
                    grandChildren: [
                        '(machine).state3.state3a',
                        '(machine).state4.state4a',
                    ],
                    id: '(machine)',
                },
            },
            {
                invite: '#2',
                args: machine2,
                expected: {
                    grandChildren: [
                        'main.child1.grandChild1_1',
                        'main.child2.grandChild2_2',
                    ],
                    id: 'main',
                },
            },
        ],
    });
});
