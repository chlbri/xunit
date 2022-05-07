import { DeepConfig, StateType } from '../../types';
import { isObject } from '../types';

export function hasChildrenStates(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): value is {
  states: Record<string, DeepConfig>;
  id?: string;
  type?: StateType;
} {
  return (
    isObject(value) && value.states && Object.keys(value.states).length > 0
  );
}
