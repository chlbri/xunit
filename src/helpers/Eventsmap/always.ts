import { NExclude } from '@bemedev/types';
import { SingleOrArray } from 'xstate';
import { Config, Transition } from '../../types';
import { isString } from '../types';
import { isTransition } from '../types/isTransition';
import { reducerTarget } from './reducer';

export function createTestActionForAlways(
  always: NExclude<Config['always'], undefined>,
  id: string,
): SingleOrArray<Transition | string> {
  if (isString(always)) {
    return always;
  }
  if (isTransition(always)) {
    return reducerTarget(always, id);
  }
  return always.map(t => createTestActionForAlways(t, id)) as Transition[];
}
