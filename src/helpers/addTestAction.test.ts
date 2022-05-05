import { dataCompare, shallowCompare, ttest } from '@bemedev/test';
import { addTestAction } from './addTestAction';
import { testAction } from './testAction';

describe('Always', () => {
  ttest({
    func: addTestAction,
    tests: [
      {
        invite: '#1',
        args: { always: 'target1', key: 'key1' },
        expected: {
          always: {
            target: 'target1',
            actions: testAction(),
          },
        },
      },
      {
        invite: '#2',
        args: { always: 'target2', key: 'key2' },
        expected: {
          always: {
            target: 'target2',
            actions: testAction('key2'),
          },
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
        args: { always: { target: 'target4', actions: 'action4' } },
        expected: {
          always: {
            target: 'target4',
            actions: ['action4', testAction()],
          },
        },
        compare: dataCompare,
      },
    ],
    compare: shallowCompare,
  });
});

describe('On', () => {
  ttest({
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
            DEBT: { target: 'debt', actions: testAction() },
            CREDIT: { target: 'credit', actions: testAction() },
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
              actions: ['action2', testAction()],
            },
          },
        },
        compare: dataCompare,
      },
    ],
    compare: shallowCompare,
  });
});

describe('After', () => {
  ttest({
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
            time1: { target: 'debt', actions: testAction() },
            time2: { target: 'credit', actions: testAction() },
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
              actions: ['action2', testAction()],
            },
          },
        },
        compare: dataCompare,
      },
      {
        invite: '#3',
        args: {
          after: {
            300: 'paypal',
          },
        },
        expected: {
          after: {
            300: {
              target: 'paypal',
              actions: testAction(),
            },
          },
        },
        compare: dataCompare,
      },
    ],
    compare: shallowCompare,
  });
});
