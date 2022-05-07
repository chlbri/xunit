import { createMachine, StateMachine } from 'xstate';
import { addRecursiveTestAction } from './addRecursiveTestAction';
import { isObject } from './helpers';
import { generateIds } from './helpers/generateIds';
import { DeepConfig } from './types';

export function transformMachineForTests(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machine: StateMachine<any, any, any, any, any, any, any>,
) {
  const _machine = { ...machine };

  const config = addRecursiveTestAction(
    generateIds(_machine.config as DeepConfig),
  );

  const options = _machine.options;
  const out = createMachine({ context: {}, ...config }, options);

  if (!isObject(out.context)) {
    throw 'Context must be an object';
  }
  return out;
}
