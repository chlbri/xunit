import { DeepConfig } from '../../types';
import { flatten } from '../actions';
import { collectGrandChildFromParallel } from './collectGrandChildFromParallel';

export function collectGrandChildFromParallelRecursive(
  config: DeepConfig,
) {
  return flatten(config)
    .map(collectGrandChildFromParallel)
    .filter(value => {
      return (
        !!value.id &&
        !!value.grandChildren &&
        value.grandChildren.length > 0
      );
    });
}
