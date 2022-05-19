"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@bemedev/test");
const actions_1 = require("../actions");
const collectGrandChildFromParallelRecursive_1 = require("./collectGrandChildFromParallelRecursive");
describe('Collect Recursive', () => {
    const machine = (0, actions_1.generateIds)({
        initial: 'idle',
        states: {
            idle: {
                on: {
                    START: 'on',
                },
            },
            on: {
                on: {
                    TOGGLE: 'off',
                },
            },
            off: {
                on: {
                    TOGGLE: 'on',
                },
                type: 'parallel',
                states: {
                    state1: {
                    // on: {
                    //   TOGGLE2: 'state2',
                    // },
                    },
                    state2: {
                    // on: {
                    //   TOGGLE2: 'state3',
                    // },
                    },
                    state3: {
                        // on: {
                        //   TOGGLE2: 'state4',
                        // },
                        on: {
                            TOGGLE3: '.state3b',
                        },
                        initial: 'state3a',
                        states: {
                            state3a: {},
                            state3b: {},
                        },
                    },
                    state4: {
                        initial: 'state4a',
                        states: {
                            state4a: {
                                on: {
                                    TOGGLE2: 'state4b',
                                },
                            },
                            state4b: {
                                on: {
                                    TOGGLE2: 'state4a',
                                },
                            },
                        },
                    },
                },
            },
            off2: {
                on: {
                    TOGGLE: 'on',
                },
                type: 'parallel',
                states: {
                    state1: {
                    // on: {
                    //   TOGGLE2: 'state2',
                    // },
                    },
                    state2: {
                    // on: {
                    //   TOGGLE2: 'state3',
                    // },
                    },
                    state3: {
                        // on: {
                        //   TOGGLE2: 'state4',
                        // },
                        on: {
                            TOGGLE3: '.state3b',
                        },
                        initial: 'state3a',
                        states: {
                            state3a: {},
                            state3b: {},
                        },
                    },
                    state4: {
                        initial: 'state4a',
                        states: {
                            state4a: {
                                on: {
                                    TOGGLE2: 'state4b',
                                },
                            },
                            state4b: {
                                on: {
                                    TOGGLE2: 'state4a',
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    (0, test_1.ttest)({
        func: collectGrandChildFromParallelRecursive_1.collectGrandChildFromParallelRecursive,
        tests: [
            {
                invite: '#1',
                args: machine,
                expected: [
                    {
                        grandChildren: [
                            '(machine).off.state3.state3a',
                            '(machine).off.state4.state4a',
                        ],
                        id: '(machine).off',
                    },
                    {
                        grandChildren: [
                            '(machine).off2.state3.state3a',
                            '(machine).off2.state4.state4a',
                        ],
                        id: '(machine).off2',
                    },
                ],
            },
        ],
    });
});
