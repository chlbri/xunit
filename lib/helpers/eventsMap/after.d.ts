import { NExclude } from '@bemedev/types';
import { Config } from '../../types';
export declare function createTestActionForAfter(
  after: NExclude<Config['after'], undefined>,
  id: string,
): NExclude<Config['on'], undefined>;
