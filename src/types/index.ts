/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, BaseActions, EventObject } from 'xstate';
import { TESTS_KEY } from '../constants';

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
