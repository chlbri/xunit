/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFunction, FINAL_TARGET, serve } from '@bemedev/fsf';
import { NOmit } from '@bemedev/types';
import { Config } from '../types';
import {
  createTestActionForAfter,
  createTestActionForAlways,
  createTestActionForOn,
} from './Eventsmap';

const AddTestActionMachine = createFunction(
  {
    context: {
      always: undefined,
      on: undefined,
      after: undefined,
    },
    schema: {
      args: {} as Config,
      data: {} as Config,
      context: {} as NOmit<Config, 'id'> & {
        _temp?: NOmit<Config, 'id'>;
      },
    },
    initial: 'idle',
    states: {
      idle: {
        type: 'sync',
        transitions: [
          {
            target: 'assigningContext',
            actions: 'assignContext',
          },
        ],
      },
      assigningContext: {
        type: 'sync',
        transitions: [
          {
            target: 'checkExistences',
          },
        ],
      },
      checkExistences: {
        type: 'sync',
        transitions: [
          {
            conditions: 'hasAlways',
            target: 'computeAlways',
          },
          {
            conditions: 'hasOn',
            target: 'computeOn',
          },
          {
            conditions: 'hasAfter',
            target: 'computeAfter',
          },
          {
            target: FINAL_TARGET,
          },
        ],
      },
      computeAlways: {
        type: 'sync',
        transitions: [
          {
            target: 'checkExistences',
            actions: ['addTestActionForAlways', 'removeAlways'],
          },
        ],
      },
      computeOn: {
        type: 'sync',
        transitions: [
          {
            target: 'checkExistences',
            actions: ['addTestActionForOn', 'removeOn'],
          },
        ],
      },
      computeAfter: {
        type: 'sync',
        transitions: [
          {
            target: 'checkExistences',
            actions: ['addTestActionForAfter', 'removeAfter'],
          },
        ],
      },
    },
    data: (ctx, ev) => {
      return {
        ...ev,
        ...ctx._temp,
      };
    },
  },
  {
    actions: {
      assignContext: (ctx, { on, after, always }) => {
        ctx.on = on;
        ctx.after = after;
        ctx.always = always;
      },
      removeAlways: ctx => {
        ctx.always = undefined;
      },
      removeOn: ctx => {
        ctx.on = undefined;
      },
      removeAfter: ctx => {
        ctx.after = undefined;
      },
      addTestActionForAlways: (ctx, ev) => {
        ctx._temp = {
          ...ctx._temp,
          always: createTestActionForAlways(
            ctx.always ?? 'unknown',
            ev.id ?? 'unknown',
          ),
        };
      },
      addTestActionForOn: (ctx, ev) => {
        ctx._temp = {
          ...ctx._temp,
          on: createTestActionForOn(ctx.on ?? {}, ev.id ?? 'unknown'),
        };
      },
      addTestActionForAfter: (ctx, ev) => {
        ctx._temp = {
          ...ctx._temp,
          after: createTestActionForAfter(
            ctx.after ?? {},
            ev.id ?? 'unknown',
          ),
        };
      },
    },
    conditions: {
      hasAlways: ({ always }) => {
        return !!always;
      },
      hasOn: ({ on }) => !!on,
      hasAfter: ({ after }) => !!after,
    },
  },
);

export const addTestAction = serve(AddTestActionMachine);
