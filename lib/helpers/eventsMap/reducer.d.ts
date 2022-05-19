import { Transition } from '../../types';
export declare function reducerTarget(
  transition: Transition,
  id: string,
):
  | {
      target: string;
      actions:
        | import('../../types').SingleOrArray<
            import('xstate').Action<any, import('xstate').EventObject>
          >
        | undefined;
    }
  | {
      actions:
        | string
        | import('xstate').ActionObject<any, import('xstate').EventObject>
        | ((
            context: any,
            event: import('xstate').EventObject,
            meta: import('xstate').ActionMeta<
              any,
              import('xstate').EventObject,
              import('xstate').BaseActionObject
            >,
          ) => void)
        | import('xstate').Action<any, import('xstate').EventObject>[];
      target?: undefined;
    };
