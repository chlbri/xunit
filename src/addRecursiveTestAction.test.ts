/* eslint-disable @typescript-eslint/no-explicit-any */
import { NFunction, shallowCompare, ttest } from '@bemedev/test';
import { addRecursiveTestAction } from './addRecursiveTestAction';
import { testAction } from './helpers/testAction';
import { DeepConfig } from './types';

describe('Complex tests', () => {
  ttest.concurrent({
    func: addRecursiveTestAction as NFunction<any, [DeepConfig]>,
    tests: [
      {
        invite: '#1',
        expected: {
          entry: [testAction('')],
          states: {
            state1: { always: 'state2', entry: [testAction('')] },
            state2: { on: { GO: 'state1' }, entry: [testAction('')] },
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
                actions: ['action2', testAction('')],
              },
              entry: [testAction('')],
            },
          },
          entry: [testAction('')],
        },
      },
      {
        invite: '#3',
        args: {
          always: { actions: 'action3' },
        },
        expected: {
          always: {
            actions: ['action3', testAction('')],
          },
          entry: [testAction('')],
        },
      },
    ],
    compare: shallowCompare,
  });
});
