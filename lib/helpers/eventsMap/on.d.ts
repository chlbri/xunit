import { NExclude } from '@bemedev/types';
import { Config } from '../../types';
export declare function createTestActionForOn(
  on: NExclude<Config['on'], undefined>,
  id: string,
): NExclude<Config['on'], undefined>;
