import { assign } from '@xstate/immer';
import { TESTS_KEY } from '../constants';
import { ITestContext } from '../types';

export function testAction(key: string) {
  return assign((ctx: ITestContext) => {
    TESTS_KEY;
    const _ctx = { ...ctx };
    delete _ctx[TESTS_KEY];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (!ctx[TESTS_KEY]) {
      ctx[TESTS_KEY] = [];
    }
    ctx[TESTS_KEY]?.push({
      currentState: key,
      currentContext: _ctx,
    });
  });
}
