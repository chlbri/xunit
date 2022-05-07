import { ttest } from '@bemedev/test';
import { addEntryAction } from './addEntryAction';
import { testAction } from './testAction';
describe('Entry action', () => {
  ttest({
    func: addEntryAction,
    tests: [
      {
        invite: '#1',
        args: {},
        expected: {
          entry: [testAction('')],
        },
      },
      {
        invite: '#2',
        args: {
          id: 'id2',
        },
        expected: {
          id: 'id2',
          entry: [testAction('')],
        },
      },
      {
        invite: '#3',
        args: {
          id: 'id3',
          entry: 'action3',
        },
        expected: {
          id: 'id3',
          entry: ['action3', testAction('')],
        },
      },
      {
        invite: '#4',
        args: {
          id: 'id4',
          entry: ['action4a', 'action4b'],
        },
        expected: {
          id: 'id4',
          entry: ['action4a', 'action4b', testAction('')],
        },
      },
    ],
  });
});
