import { NExclude } from '@bemedev/types';
import { Config } from '../../types';
import { addActions } from '../addActions';
import { testAction } from '../testAction';
import { isString } from '../types';
import { isTransition } from '../types/isTransition';

export function createTestActionForAfter(
  after: NExclude<Config['after'], undefined>,
  key: string,
): NExclude<Config['on'], undefined> {
  const _action = testAction(key);
  const values = Object.entries(after);
  const out: NExclude<Config['after'], undefined> = {};
  values.forEach(([key, value1]) => {
    if (isString(value1)) {
      let _key: string | number = key;
      _key = parseFloat(key);
      if (isNaN(_key)) {
        _key = key;
      }
      return (out[_key] = {
        target: value1,
        actions: addActions(_action),
      });
    }
    if (isTransition(value1)) {
      const _actions1 = value1.actions;
      const actions = addActions(_action, _actions1);

      return (out[key] = {
        target: value1.target,
        actions,
      });
    }
    const children = value1.map(value2 => {
      if (isString(value2)) {
        return { target: value2, actions: addActions(_action) };
      }
      const _actions2 = value2.actions;
      const actions = addActions(_action, _actions2);

      return {
        target: value2.target,
        actions,
      };
    });
    out[key] = children;
  });

  return out;
}
