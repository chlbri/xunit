import { dataCompare, shallowCompare, ttest } from '@bemedev/test';
import { addTestAction } from './addTestAction';
import { testAction } from '../testAction';

describe('Always', () => {
  ttest.concurrent({
    func: addTestAction,
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
            actions: ['action4', testAction('key')],
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
              actions: ['action4b', testAction('key')],
            },
          ],
        },
        compare: dataCompare,
      },
    ],
    compare: shallowCompare,
  });
});

describe('On', () => {
  ttest.concurrent({
    func: addTestAction,
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
        compare: dataCompare,
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
              actions: ['action2', testAction('key')],
            },
          },
        },
        compare: dataCompare,
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
                actions: ['action4b', 'action4c', testAction('key1')],
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
  ttest.concurrent({
    func: addTestAction,
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
              actions: ['action3', testAction('key')],
            },
          },
        },
        compare: dataCompare,
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
                actions: ['action4b', testAction('key')],
              },
              'target4b',
            ],
          },
        },
        compare: dataCompare,
      },
    ],
  });
});
