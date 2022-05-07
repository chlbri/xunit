import { createMachine, StateMachine } from 'xstate';
import { addRecursiveTestAction } from './addRecursiveTestAction';
import {
  collectGrandChildFromParallelRecursive,
  generateIds,
  isObject,
} from './helpers';
import { DeepConfig } from './types';

export function transformMachineForTests(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machine: StateMachine<any, any, any, any, any, any, any>,
) {
  const _genratedIDs = generateIds(machine.config as DeepConfig);
  const config = addRecursiveTestAction(_genratedIDs);

  const parallelsWithChildren =
    collectGrandChildFromParallelRecursive(_genratedIDs);

  const options = machine.options;
  const out = createMachine({ context: {}, ...config } as never, options);

  if (!isObject(out.context)) {
    throw 'Context must be an object';
  }
  return { machine: out, parallelsWithChildren } as const;
}
