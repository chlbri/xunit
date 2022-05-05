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

console.log('machine.config', JSON.stringify(machine.config, null, 2));
