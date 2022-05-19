import { Action, EventObject } from 'xstate';
import { ITestContext, Transition } from '../../types';
export declare function addActions(
  action: Action<ITestContext, EventObject>,
  actions?: Transition['actions'],
):
  | string
  | import('xstate').ActionObject<any, EventObject>
  | ((
      context: any,
      event: EventObject,
      meta: import('xstate').ActionMeta<
        any,
        EventObject,
        import('xstate').BaseActionObject
      >,
    ) => void)
  | Action<any, EventObject>[];
