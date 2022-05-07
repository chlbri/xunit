import { DeepConfig } from '../types';
import { isParallel } from './checkers';

export function getInitialIDForCompoundState(
  config: DeepConfig,
): string | undefined {
  const initial = config.initial;
  if (!initial) {
    return undefined;
  }
  const initialState = config.states?.[initial];
  if (!initialState) {
    return undefined;
  }
  if (isParallel(initialState)) {
    return undefined;
  }
  if (!initialState.initial) {
    return initialState.id;
  }
  return getInitialIDForCompoundState(initialState);
}
