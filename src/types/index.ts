import { Action, EventObject } from 'xstate';

export type SingleOrArray<T> = T | T[];

export type Transition = {
  actions?: SingleOrArray<Action<IContext, EventObject>>;
  target: string;
};

export type Config = {
  key?: string;
  id?: string;
  on?: Record<string, SingleOrArray<Transition | string>>;
  after?: Record<string | number, SingleOrArray<Transition | string>>;
  always?: SingleOrArray<Transition | string>;
};

export type History<T> = {
  currentState: string;
  currentContext: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IContext<T = any> = {
  __tests__?: History<T>[];
};
