import {
  addEntryAction,
  addTestAction,
  hasChildrenStates,
  isParallel,
} from './helpers';
import { DeepConfig } from './types';

function addActions(config: DeepConfig): DeepConfig {
  return addEntryAction(addTestAction(config));
}

export function addRecursiveTestAction(
  config: DeepConfig,
  parentIsParallel = false,
) {
  const __config = { ...config };
  const _isParallel = isParallel(__config);
  const _config =
    parentIsParallel || (!_isParallel && hasChildrenStates(__config))
      ? addTestAction(__config)
      : addActions(__config);

  if (!hasChildrenStates(_config)) {
    return _config;
  }

  Object.entries(_config.states).forEach(([key, value]) => {
    _config.states[key] = {
      ...addRecursiveTestAction(value, _isParallel),
    };
  });

  return _config;
}
