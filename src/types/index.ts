/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Action,
  BaseActionObject,
  BaseActions,
  Event,
  EventObject,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  StateMachine,
  StateSchema,
  TypegenDisabled,
  Typestate,
} from 'xstate';
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

export type StateType =
  | 'atomic'
  | 'compound'
  | 'parallel'
  | 'final'
  | 'history';

export type EntryConfig = {
  id?: string;
  type?: StateType;
  entry?: BaseActions<any, any, any>;
};

export type DeepConfig = Config &
  EntryConfig & {
    initial?: string;
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

export type Waiter<TE extends EventObject> = {
  wait?: number;
  event: Event<TE>;
};

export type TestsProps<
  TC,
  TE extends EventObject,
  TA extends BaseActionObject = BaseActionObject,
  TS extends ServiceMap = ServiceMap,
  TR = ResolveTypegenMeta<TypegenDisabled, NoInfer<TE>, TA, TS>,
  ASYNC extends boolean | undefined = undefined,
> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machine: StateMachine<TC, StateSchema, TE, Typestate<TC>, TA, TS, TR>;
  events?: (ASYNC extends undefined | false ? Event<TE> : Waiter<TE>)[];
  async?: ASYNC;
  useFakeTimers?: boolean;
  initialState?: string;
  initialContext?: TC;
};

export type ParallelsWithChildren = {
  id?: string;
  grandChildren?: string[];
};
