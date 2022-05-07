import { NExclude } from '@bemedev/types';
import { Config } from '../../types';
import { isString, isTransition } from '../types';
import { reducerTarget } from './reducer';

export function createTestActionForOn(
  on: NExclude<Config['on'], undefined>,
  id: string,
): NExclude<Config['on'], undefined> {
  const values = Object.entries(on);
  const out: NExclude<Config['on'], undefined> = {};
  values.forEach(([key, value1]) => {
    if (isString(value1)) {
      return (out[key] = value1);
    }
    if (isTransition(value1)) {
      return (out[key] = reducerTarget(value1, id));
    }
    const children = value1.map(value2 => {
      if (isString(value2)) {
        return value2;
      }
      return reducerTarget(value2, id);
    });
    out[key] = children;
  });

  return out;
}
