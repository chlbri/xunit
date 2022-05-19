"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
const constants_1 = require("./constants");
const transformMachineForTests_1 = require("./transformMachineForTests");
describe('Machine 1 : simple', () => {
    const _machine1 = (0, xstate_1.createMachine)({
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
                states: {
                    state1: {},
                },
            },
        },
    });
    const { machine } = (0, transformMachineForTests_1.transformMachineForTests)(_machine1);
    describe('Case => One Event', () => {
        let tests = undefined;
        beforeAll(() => {
            tests = machine.transition(machine.initialState, 'START').context[constants_1.TESTS_KEY];
        });
        it('Tests must be defined', () => {
            expect(tests).toBeDefined();
        });
        it("Tests can't be empty", () => {
            expect(tests).toHaveLength(2);
        });
        it('Tests the value', () => {
            expect(tests).toContainAllValues([
                {
                    currentState: '(machine).idle',
                    currentContext: {},
                },
                {
                    currentState: '(machine).on',
                    currentContext: {},
                },
            ]);
        });
    });
});
describe('Machine 2 : parallel', () => {
    const _machine2 = (0, xstate_1.createMachine)({
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
        },
    });
    const { machine } = (0, transformMachineForTests_1.transformMachineForTests)(_machine2);
    describe('Case => Multiples Events', () => {
        let tests = undefined;
        beforeAll(() => {
            const interpreter = (0, xstate_1.interpret)(machine).start();
            interpreter.send(['START', 'TOGGLE', 'TOGGLE2', 'TOGGLE2']);
            tests = interpreter.state.context[constants_1.TESTS_KEY];
        });
        it('Tests must be defined', () => {
            expect(tests).toBeDefined();
        });
        it("Tests can't be empty", () => {
            expect(tests).not.toBeEmpty();
        });
    });
});
