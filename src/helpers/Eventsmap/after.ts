import { NExclude } from '@bemedev/types';
import { Config } from '../../types';
import { isString } from '../types';
import { isTransition } from '../types';
import { reducerTarget } from './reducer';

export function createTestActionForAfter(
  after: NExclude<Config['after'], undefined>,
  id: string,
): NExclude<Config['on'], undefined> {
  const values = Object.entries(after);
  const out: NExclude<Config['after'], undefined> = {};
  values.forEach(([key, value1]) => {
    if (isString(value1)) {
      let _key: string | number = key;
      _key = parseFloat(key);
      if (isNaN(_key)) {
        _key = key;
      }
      return (out[_key] = value1);
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
