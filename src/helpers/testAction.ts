import { assign } from '@xstate/immer';
import { IContext } from '../types';

export function testAction(key?: string) {
  return assign((ctx: IContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __tests__, ...rest } = ctx;
    if (!ctx.__tests__) ctx.__tests__ = [];
    ctx.__tests__.push({
      currentState: key ?? 'unknown',
      currentContext: rest,
    });
  });
}
