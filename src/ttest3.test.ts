import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';
import { testMachine } from './testMachine';
const machine = createMachine(
  {
    id: 'test',
    initial: 'step1',
    context: {
      iterator: 0,
    },
    states: {
      step1: {
        on: {
          NEXT: 'step2',
        },
      },
      step2: {
        entry: 'inc',
        on: {
          NEXT: 'step3',
        },
      },
      step3: {
        entry: 'inc',
      },
    },
  },
  {
    actions: {
      inc: assign(context => {
        context.iterator++;
      }),
    },
  },
);

describe('Test defined initialState', () => {
  testMachine({
    machine,
    initialState: 'test.step2',
    events: ['NEXT'],
    history: [
      {
        currentContext: {
          iterator: 0,
        },
        currentState: 'test.step2',
      },
      {
        currentContext: {
          iterator: 1,
        },
        currentState: 'test.step3',
      },
    ],
  });
});

describe('Test defined initialContext', () => {
  testMachine({
    machine,
    initialContext: {
      iterator: 4,
    },
    events: ['NEXT', 'NEXT'],
    history: [
      {
        currentContext: {
          iterator: 4,
        },
        currentState: 'test.step1',
      },
      {
        currentContext: {
          iterator: 5,
        },
        currentState: 'test.step2',
      },
      {
        currentContext: {
          iterator: 6,
        },
        currentState: 'test.step3',
      },
    ],
  });
});

describe('Test defined initialContext & initialState', () => {
  testMachine({
    machine,
    initialContext: {
      iterator: 4,
    },
    initialState: 'test.step2',
    events: ['NEXT', 'NEXT'],
    history: [
      {
        currentContext: {
          iterator: 4,
        },
        currentState: 'test.step2',
      },
      {
        currentContext: {
          iterator: 5,
        },
        currentState: 'test.step3',
      },
    ],
  });
});
