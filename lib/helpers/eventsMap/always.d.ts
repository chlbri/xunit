import { NExclude } from '@bemedev/types';
import { SingleOrArray } from 'xstate';
import { Config, Transition } from '../../types';
export declare function createTestActionForAlways(
  always: NExclude<Config['always'], undefined>,
  id: string,
): SingleOrArray<Transition | string>;
