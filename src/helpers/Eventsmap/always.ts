import { NExclude } from '@bemedev/types';
import { SingleOrArray } from 'xstate';
import { Config, Transition } from '../../types';
import { addActions } from '../addActions';
import { testAction } from '../testAction';
import { isString } from '../types';
import { isTransition } from '../types/isTransition';

export function createTestActionForAlways(
  always: NExclude<Config['always'], undefined>,
  key: string,
): SingleOrArray<Transition> {
  const _action = testAction(key);
  if (isString(always)) {
    return {
      target: always,
      actions: addActions(_action),
    };
  }
  if (isTransition(always)) {
    const _actions = always.actions;
    const actions = addActions(_action, _actions);

    return {
      target: always.target,
      actions,
    };
  }
  return always?.map(t =>
    createTestActionForAlways(t, key),
  ) as Transition[];
}
