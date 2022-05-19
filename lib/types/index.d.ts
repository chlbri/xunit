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
export declare type SingleOrArray<T> = T | T[];
export declare type Transition = {
  actions?: SingleOrArray<Action<ITestContext, EventObject>>;
  target?: string;
};
export declare type Config = {
  id?: string;
  on?: Record<string, SingleOrArray<Transition | string>>;
  after?: Record<string | number, SingleOrArray<Transition | string>>;
  always?: SingleOrArray<Transition | string>;
};
export declare type StateType =
  | 'atomic'
  | 'compound'
  | 'parallel'
  | 'final'
  | 'history';
export declare type EntryConfig = {
  id?: string;
  type?: StateType;
  entry?: BaseActions<any, any, any>;
};
export declare type DeepConfig = Config &
  EntryConfig & {
    initial?: string;
    states?: Record<string, DeepConfig>;
  };
export declare type History<T> = {
  currentState: string;
  currentContext: T;
};
export declare type ITestContext<T = any> = T & {
  [TESTS_KEY]?: History<T>[];
};
export declare type Waiter<TE extends EventObject> = {
  wait?: number;
  event: Event<TE>;
};
export declare type TestsProps<
  TC,
  TE extends EventObject,
  TA extends BaseActionObject = BaseActionObject,
  TS extends ServiceMap = ServiceMap,
  TR = ResolveTypegenMeta<TypegenDisabled, NoInfer<TE>, TA, TS>,
  ASYNC extends boolean | undefined = undefined,
> = {
  machine: StateMachine<TC, StateSchema, TE, Typestate<TC>, TA, TS, TR>;
  events?: (ASYNC extends undefined | false ? Event<TE> : Waiter<TE>)[];
  async?: ASYNC;
  useFakeTimers?: boolean;
};
export declare type ParallelsWithChildren = {
  id?: string;
  grandChildren?: string[];
};
