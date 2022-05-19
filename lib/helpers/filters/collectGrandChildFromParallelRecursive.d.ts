import { DeepConfig } from '../../types';
export declare function collectGrandChildFromParallelRecursive(
  config: DeepConfig,
): {
  id?: string | undefined;
  grandChildren?: string[] | undefined;
}[];
