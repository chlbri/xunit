import { Transition } from '../../types';
import { addActions } from '../addActions';
import { testAction } from '../testAction';

export function reducerTarget(transition: Transition, id: string) {
  const _actions = transition.actions;

  const target = transition.target;
  if (target) {
    const actions = _actions;
    return {
      target,
      actions,
    };
  }
  const actions = addActions(testAction(id), _actions);
  return {
    actions,
  };
}
