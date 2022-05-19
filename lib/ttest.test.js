"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
const testMachine_1 = require("./testMachine");
describe('TestMachine', () => {
    const machine = (0, xstate_1.createMachine)({
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
            },
        },
    });
    const machine2 = (0, xstate_1.createMachine)({
        initial: 'idle',
        id: 'main',
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
                                    TOGGLE4: 'state4b',
                                },
                            },
                            state4b: {
                                on: {
                                    TOGGLE4: '#main.off2',
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
                                    TOGGLE4: 'state4b',
                                },
                            },
                            state4b: {
                                on: {
                                    TOGGLE4: 'state4a',
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    const machine3 = (0, xstate_1.createMachine)({
        initial: 'idle',
        context: {
            arg1: 'levi',
            arg2: 2022,
            arg3: true,
        },
        id: 'main',
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
                                    TOGGLE4: 'state4b',
                                },
                            },
                            state4b: {
                                on: {
                                    TOGGLE4: '#main.off2',
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
                                    TOGGLE4: 'state4b',
                                },
                            },
                            state4b: {
                                on: {
                                    TOGGLE4: 'state4a',
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    (0, testMachine_1.testMachine)({
        machine,
        async: true,
        useFakeTimers: true,
        events: [
            { wait: 3000, event: 'START' },
            { wait: 3000, event: 'TOGGLE' },
            { wait: 3000, event: 'TOGGLE' },
        ],
        history: [
            { currentState: '(machine).idle', currentContext: {} },
            { currentState: '(machine).on', currentContext: {} },
            { currentState: '(machine).off', currentContext: {} },
            { currentState: '(machine).on', currentContext: {} },
        ],
    });
    (0, testMachine_1.testMachine)({
        machine: machine2,
        async: true,
        useFakeTimers: true,
        events: [
            { wait: 3000, event: 'START' },
            { wait: 3000, event: 'TOGGLE' },
            { wait: 3000, event: 'TOGGLE4' },
            { wait: 3000, event: 'TOGGLE4' },
            { wait: 3000, event: 'TOGGLE4' },
        ],
        containsStateIds: ['main.off.state4.state4b', 'main.off2', 'main.off'],
    });
    (0, testMachine_1.testMachine)({
        machine: machine3,
        async: true,
        useFakeTimers: true,
        events: [
            { wait: 3000, event: 'START' },
            { wait: 3000, event: 'TOGGLE' },
            { wait: 3000, event: 'TOGGLE4' },
            { wait: 3000, event: 'TOGGLE4' },
            { wait: 3000, event: 'TOGGLE4' },
        ],
        containsContexts: [
            {
                arg1: 'levi',
                arg2: 2022,
                arg3: true,
            },
            {
                arg1: 'levi',
                arg2: 2022,
                arg3: true,
            },
        ],
    });
});
