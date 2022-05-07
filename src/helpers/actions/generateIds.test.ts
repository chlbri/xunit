import { shallowCompare, ttest } from '@bemedev/test';
import { DeepConfig } from '../../types';
import { generateIds } from './generateIds';

const config1: DeepConfig = {
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
};

const config2: DeepConfig = {
  states: {
    idle: {
      on: {
        START: 'debit',
      },
    },
    debit: {
      on: {
        CRED: 'credit',
        DEBT: {
          actions: 'debit',
        },
      },
    },
    credit: {
      on: {
        DEBT: 'debit',
        CRED: {
          actions: 'credit',
        },
      },
    },
  },
};

const func = generateIds;

describe('IDS', () => {
  ttest({
    func,
    tests: [
      {
        invite: '#1',
        args: config1,
        expected: {
          states: {
            idle: { on: { START: 'on' }, id: '(machine).idle' },
            on: { on: { TOGGLE: 'off' }, id: '(machine).on' },
            off: {
              on: { TOGGLE: 'on' },
              states: { state1: { id: '(machine).off.state1' } },
              id: '(machine).off',
            },
          },
          id: '(machine)',
        },
      },
      {
        invite: '#2',
        args: config2,
        expected: {
          states: {
            idle: { on: { START: 'debit' }, id: '(machine).idle' },
            debit: {
              on: { CRED: 'credit', DEBT: { actions: 'debit' } },
              id: '(machine).debit',
            },
            credit: {
              on: {
                DEBT: 'debit',
                CRED: {
                  actions: 'credit',
                },
              },
              id: '(machine).credit',
            },
          },
          id: '(machine)',
        },
      },
    ],
    compare: shallowCompare,
  });
});
