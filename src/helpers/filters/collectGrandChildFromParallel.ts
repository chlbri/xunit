import { createFunction, FINAL_TARGET, serve } from '@bemedev/fsf';
import { DeepConfig } from '../../types';
import { isParallel } from '../checkers';
import { getInitialIDForCompoundState } from '../getInitialID';

const collectGrandChildFromParallelMachine = createFunction(
  {
    context: {
      // grandChildren: [],
    },
    schema: {
      args: {} as DeepConfig,
      context: {} as { id?: string; grandChildren?: string[] },
    },
    initial: 'idle',

    states: {
      idle: {
        type: 'sync',
        transitions: [
          {
            target: 'checkingParallel',
            actions: 'initializeGrandChildren',
          },
        ],
      },
      checkingParallel: {
        type: 'sync',
        transitions: [
          {
            conditions: 'isParallel',
            target: 'collecting',
          },
          {
            target: FINAL_TARGET,
          },
        ],
      },
      collecting: {
        type: 'sync',
        transitions: [
          {
            target: FINAL_TARGET,
            actions: ['assignId', 'collectGrandChildren'],
          },
        ],
      },
    },
  },
  {
    conditions: {
      isParallel(_, event) {
        return isParallel(event);
      },
    },
    actions: {
      initializeGrandChildren(context) {
        context.grandChildren = [];
      },
      assignId(context, args) {
        context.id = args.id;
      },
      collectGrandChildren(context, event) {
        const states = event.states;
        if (!states) {
          throw `states are not defined for parallel state ${event.id}`;
        }
        Object.values(states).forEach(state => {
          const id = getInitialIDForCompoundState(state);
          if (id) {
            context.grandChildren?.push(id);
          }
        });
      },
    },
  },
);

export const collectGrandChildFromParallel = serve(
  collectGrandChildFromParallelMachine,
);
