import { Action, EventObject } from 'xstate';
import { IContext, Transition } from '../types';
import { isString } from './types';

export function addActions(
  action: Action<IContext, EventObject>,
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
