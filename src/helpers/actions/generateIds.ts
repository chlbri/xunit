import { DeepConfig } from '../../types';
import { hasChildrenStates } from '../checkers';

type ConcatProps = {
  text: string;
  separator?: string;
  args?: (string | undefined)[];
};

export function concatId({
  text,
  separator = '.',
  args = [],
}: ConcatProps) {
  return [text, ...args]
    .filter(t => !!t)
    .reduce((acc, curr) => `${acc}${separator}${curr}`) as string;
}

function _generateIds(
  config: DeepConfig,
  first = true,
  text = '',
  args: string[] = [],
) {
  const _config = { ...config };
  if (first) {
    if (!_config.id) _config.id = '(machine)';
  } else {
    _config.id = concatId({ text, args });
  }
  if (hasChildrenStates(config)) {
    const children = Object.entries(config.states)
      .map(([key, value]) => ({
        [key]: _generateIds(value, false, _config.id, [key]),
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    _config.states = children;
  }
  return _config;
}

export const generateIds = (config: DeepConfig) => _generateIds(config);
