import {
  BaseActionObject,
  EventObject,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from 'xstate';
import { TestsProps } from '../types';
export declare function useMachine<
  TC,
  TE extends EventObject,
  TA extends BaseActionObject = BaseActionObject,
  TS extends ServiceMap = ServiceMap,
  TR = ResolveTypegenMeta<TypegenDisabled, NoInfer<TE>, TA, TS>,
  ASYNC extends boolean | undefined = undefined,
>(
  props: TestsProps<TC, TE, TA, TS, TR, ASYNC>,
): {
  readonly sender: () => Promise<void>;
  readonly results: () => import('../types').History<TC>[] | undefined;
  readonly id: string;
};
