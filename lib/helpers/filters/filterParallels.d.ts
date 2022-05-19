import { History, ParallelsWithChildren } from '../../types';
export declare function filterParallels<TC>(
  history?: History<TC>[],
  parallelsWithChildren?: ParallelsWithChildren[],
): History<TC>[] | undefined;
