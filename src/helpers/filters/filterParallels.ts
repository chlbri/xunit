import { History, ParallelsWithChildren } from '../../types';

export function filterParallels<TC>(
  history?: History<TC>[],
  parallelsWithChildren?: ParallelsWithChildren[],
) {
  if (!history || !parallelsWithChildren) {
    return;
  }

  let position = -1;
  let childrenNumber = -1;

  return history.filter((value, i) => {
    let out = true;
    parallelsWithChildren.forEach(parallel => {
      if (parallel.id === value.currentState) {
        position = i;
        childrenNumber = parallel.grandChildren?.length ?? 0;
      }
    });
    if (position > -1 && childrenNumber > -1) {
      out = i > position + childrenNumber || i === position;
      if (i > position + childrenNumber + 1) {
        position = childrenNumber = -1;
      }
    }

    return out;
  });
}
