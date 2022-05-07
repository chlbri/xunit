import { Transition } from '../../types';

export function isTransition(arg: unknown): arg is Transition {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    ('target' in arg || 'actions' in arg)
  );
}
