/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFunction, FINAL_TARGET, serve } from '@bemedev/fsf';
import { EntryConfig } from '../../types';
import { testAction } from '../testAction';
import { isArray } from '../types';

const machine = createFunction(
  {
    context: {},
    schema: {
      context: {} as EntryConfig,
      args: {} as EntryConfig,
    },
    initial: 'idle',
    states: {
      idle: {
        type: 'sync',
        transitions: [
          {
            target: 'checkExistence',
            actions: ['assignId', 'buildEntry'],
          },
        ],
      },
      checkExistence: {
        type: 'sync',
        transitions: [
          {
            conditions: 'isDefined',
            target: 'compute',
          },
          {
            target: FINAL_TARGET,
          },
        ],
      },
      compute: {
        type: 'sync',
        transitions: [
          {
            conditions: 'isArray',
            target: FINAL_TARGET,
            actions: 'computeArray',
          },
          {
            actions: 'computeSingle',
            target: FINAL_TARGET,
          },
        ],
      },
    },
    data: (ctx, { ...rest }: any) => {
      return { ...rest, ...ctx };
    },
  },
  {
    actions: {
      assignId(context, event) {
        context.id = event.id;
      },
      buildEntry(context, args) {
        context.entry = [testAction(args.id ?? 'unknown')];
        // if (!isParallel(args)) {
        // context.entry.push(testAction(args.id ?? 'unknown'));
        // }
      },
      computeArray(context, args) {
        context.entry.unshift(...args.entry);
      },
      computeSingle(context, args) {
        context.entry.unshift(args.entry);
      },
    },
    conditions: {
      isArray(_, args) {
        return isArray(args.entry);
      },
      isDefined(_, args) {
        return !!args.entry;
      },
    },
  },
);

export const addEntryAction = serve(machine);
