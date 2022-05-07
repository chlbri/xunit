import { hasChildrenStates } from './helpers';
import { addEntryAction } from './helpers/addEntryAction';
import { addTestAction } from './helpers/addTestAction';
import { DeepConfig } from './types';

function addActions(config: DeepConfig) {
  return addEntryAction(addTestAction(config));
}

export function addRecursiveTestAction(config: DeepConfig) {
  const _config = { ...addActions(config) };
  if (!hasChildrenStates(_config)) {
    return _config;
  }

  Object.entries(_config.states).forEach(([key, value]) => {
    _config.states[key] = { ...addActions(value) };
  });

  return _config;
}
