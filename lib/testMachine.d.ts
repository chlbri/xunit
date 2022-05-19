import {
  BaseActionObject,
  EventObject,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from 'xstate';
import { History, TestsProps } from './types';
declare type Helpers<TC> = {
  containsStateIds?: string[];
  containsContexts?: TC[];
  history?: History<TC>[];
};
export declare function testMachine<
  TC,
  TE extends EventObject,
  TA extends BaseActionObject = BaseActionObject,
  TS extends ServiceMap = ServiceMap,
  TR = ResolveTypegenMeta<TypegenDisabled, NoInfer<TE>, TA, TS>,
  ASYNC extends boolean | undefined = undefined,
>({
  containsStateIds,
  containsContexts,
  history,
  ...props
}: TestsProps<TC, TE, TA, TS, TR, ASYNC> & Helpers<TC>): Promise<void>;
export {};
