import { createMachine } from 'xstate';
const machine = createMachine({
  states: {
    ON: {
      on: {
        TOGGLE: 'OFF',
      },
    },
    OFF: {
      on: {
        TOGGLE: 'ON',
      },
    },
  },
});

