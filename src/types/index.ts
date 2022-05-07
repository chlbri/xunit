import {
  Action,
  BaseActions,
  createMachine,
  EventObject,
  StateNode,
} from 'xstate';
import { addRecursiveTestAction } from '../addRecursiveTestAction';
import { TESTS_KEY } from '../constants';
import { hasChildrenStates } from '../helpers/hasChildrenStates';

export type SingleOrArray<T> = T | T[];

export type Transition = {
  actions?: SingleOrArray<Action<ITestContext, EventObject>>;
  target?: string;
};

export type Config = {
  id?: string;
  on?: Record<string, SingleOrArray<Transition | string>>;
  after?: Record<string | number, SingleOrArray<Transition | string>>;
  always?: SingleOrArray<Transition | string>;
};

export type EntryConfig = {
  id?: string;
  entry?: BaseActions<any, any, any>;
};

export type DeepConfig = Config &
  EntryConfig & {
    states?: Record<string, DeepConfig>;
  };

export type History<T> = {
  currentState: string;
  currentContext: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ITestContext<T = any> = T & {
  [TESTS_KEY]?: History<T>[];
};

const machine = createMachine({
  states: {
    idle: {
      on: {
        START: 'on',
      },
    },
    on: {
      on: {
        TOGGLE: 'off',
      },
    },
    off: {
      on: {
        TOGGLE: 'on',
      },
      states: {
        state1: {},
      },
    },
  },
});

type ConcatProps = {
  text: string;
  separator?: string;
  args?: (string | undefined)[];
};

function concat({ text, separator = '.', args = [] }: ConcatProps) {
  return [text, ...args]
    .filter(t => !!t)
    .reduce((acc, curr) => `${acc}${separator}${curr}`) as string;
}

function mapperT(stateNode: StateNode) {
  const out: string[] = [];
  out.push(stateNode.id);
  if (hasChildrenStates(stateNode)) {
    const states = Object.values(stateNode.states);
    states.forEach(s1 => {
      out.push(...mapperT(s1));
    });
  }
  return out;
}

const values = mapperT(machine.machine);

machine.config;
addRecursiveTestAction(machine.config as any);

const config = machine.config;

const val = concat({ text: 'one', separator: 'two', args: ['three'] });
