import { DeepConfig } from '../../types';
import { hasChildrenStates } from '../checkers';

export function flatten(value: DeepConfig): DeepConfig[] {
  const out: DeepConfig[] = [];
  if (hasChildrenStates(value)) {
    const states = Object.values(value.states);
    out.push(
      value,
      ...states.map(flatten).reduce((acc, curVal) => {
        return acc.concat(curVal);
      }),
    );
  } else {
    out.push(value);
  }

  return out;
}
