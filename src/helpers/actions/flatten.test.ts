import { ttest } from '@bemedev/test';
import { flatten } from './flatten';
import { generateIds } from './generateIds';

describe('Flatten', () => {
  const machine1 = generateIds({
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

  const machine2 = generateIds({
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

  ttest({
    func: flatten,
    tests: [
      {
        invite: '#1',
        args: machine1,
        expected: [
          {
            type: 'parallel',
            states: {
              state1: { id: '(machine).state1' },
              state2: { id: '(machine).state2' },
              state3: {
                initial: 'state3a',
                states: {
                  state3a: { id: '(machine).state3.state3a' },
                  state3b: { id: '(machine).state3.state3b' },
                },
                id: '(machine).state3',
              },
              state4: {
                initial: 'state4a',
                states: {
                  state4a: { id: '(machine).state4.state4a' },
                  state4b: { id: '(machine).state4.state4b' },
                },
                id: '(machine).state4',
              },
            },
            id: '(machine)',
          },
          { id: '(machine).state1' },
          { id: '(machine).state2' },
          {
            initial: 'state3a',
            states: {
              state3a: { id: '(machine).state3.state3a' },
              state3b: { id: '(machine).state3.state3b' },
            },
            id: '(machine).state3',
          },
          { id: '(machine).state3.state3a' },
          { id: '(machine).state3.state3b' },
          {
            initial: 'state4a',
            states: {
              state4a: { id: '(machine).state4.state4a' },
              state4b: { id: '(machine).state4.state4b' },
            },
            id: '(machine).state4',
          },
          { id: '(machine).state4.state4a' },
          { id: '(machine).state4.state4b' },
        ],
      },
      {
        invite: '#2',
        args: machine2,
        expected: [
          {
            type: 'parallel',
            id: 'main',
            states: {
              child1: {
                initial: 'grandChild1_1',
                states: {
                  grandChild1_1: { id: 'main.child1.grandChild1_1' },
                  grandChild2_2: { id: 'main.child1.grandChild2_2' },
                },
                id: 'main.child1',
              },
              child2: {
                initial: 'grandChild2_2',
                states: {
                  grandChild2_1: { id: 'main.child2.grandChild2_1' },
                  grandChild2_2: { id: 'main.child2.grandChild2_2' },
                },
                id: 'main.child2',
              },
            },
          },
          {
            initial: 'grandChild1_1',
            states: {
              grandChild1_1: { id: 'main.child1.grandChild1_1' },
              grandChild2_2: { id: 'main.child1.grandChild2_2' },
            },
            id: 'main.child1',
          },
          { id: 'main.child1.grandChild1_1' },
          { id: 'main.child1.grandChild2_2' },
          {
            initial: 'grandChild2_2',
            states: {
              grandChild2_1: { id: 'main.child2.grandChild2_1' },
              grandChild2_2: { id: 'main.child2.grandChild2_2' },
            },
            id: 'main.child2',
          },
          { id: 'main.child2.grandChild2_1' },
          { id: 'main.child2.grandChild2_2' },
        ],
      },
    ],
  });
});
