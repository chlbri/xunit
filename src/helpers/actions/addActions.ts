import { Action, EventObject } from 'xstate';
import { ITestContext, Transition } from '../../types';
import { isString } from '../types';

export function addActions(
  action: Action<ITestContext, EventObject>,
  actions?: Transition['actions'],
) {
  if (isString(actions)) {
    return [actions, action];
  }
  if (actions instanceof Array) {
    return [...actions, action];
  }
  return action;
}
