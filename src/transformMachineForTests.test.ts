import { createMachine } from 'xstate';
import { TESTS_KEY } from './constants';
import { transformMachineForTests } from './transformMachineForTests';
import { ITestContext } from './types';

const _machine1 = createMachine({
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

const machine = transformMachineForTests(_machine1);

describe('Existence', () => {
  it('should be defined', () => {
    expect(machine).toBeDefined();
  });
});

describe('Working', () => {
  describe('Case => One Event', () => {
    let tests: ITestContext[typeof TESTS_KEY] = undefined;
    beforeAll(() => {
      tests = machine.transition(machine.initialState, 'START').context[
        TESTS_KEY
      ];
    });
    it('Tests must be defined', () => {
      expect(tests).toBeDefined();
    });
    it("Tests can't be empty", () => {
      expect(tests).toHaveLength(3);
    });
    it('Tests the value', () => {
      // console.log('config =>', JSON.stringify(machine.config, null, 2));

      expect(tests).toContainAllValues([
        {
          currentState: '(machine)',
          currentContext: {},
        },
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
