import { EntryConfig } from '../../types';
export declare function isParallel(
  value: EntryConfig,
): value is EntryConfig & {
  type: 'parallel';
};
