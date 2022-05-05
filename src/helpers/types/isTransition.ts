import { NExclude } from '@bemedev/types';
import { Config, Transition } from '../../types';
import { isString } from './isString';

export function isTransition(arg: unknown): arg is Transition {
  return typeof arg === 'object' && arg !== null && 'target' in arg;
}
export function isRecordOfTransitions(
  arg: unknown,
): arg is NExclude<Config['after'], undefined > {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    Object.values(arg).every(v => {
      return (
        isTransition(v) ||
        isString(v) ||
        (v instanceof Array && v.every(isTransition))
      );
    })
  );
}
