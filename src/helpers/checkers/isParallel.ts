import { EntryConfig } from '../../types';

export function isParallel(
  value: EntryConfig,
): value is EntryConfig & { type: 'parallel' } {
  return value.type === 'parallel';
}
