import { createMachine, StateMachine } from 'xstate';
import { addRecursiveTestAction } from './addRecursiveTestAction';
import { isObject } from './helpers';
import { generateIds } from './helpers/generateIds';

export function transformMachineForTests(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machine: StateMachine<any, any, any, any, any, any, any>,
) {
  const _machine = { ...machine };

  const config = addRecursiveTestAction(
    generateIds(_machine.config as any),
  );

  const options = _machine.options;
  const out = createMachine({ context: {}, ...config } as any, options);

  if (!isObject(out.context)) {
    throw 'Context must be an object';
  }
  return out;
}
