import { DeepConfig } from './types';
export declare function addRecursiveTestAction(
  config: DeepConfig,
  parentIsParallel?: boolean,
):
  | {
      after?:
        | Record<
            string | number,
            import('./types').SingleOrArray<
              string | import('./types').Transition
            >
          >
        | undefined;
      on?:
        | Record<
            string,
            import('./types').SingleOrArray<
              string | import('./types').Transition
            >
          >
        | undefined;
      always?:
        | import('./types').SingleOrArray<
            string | import('./types').Transition
          >
        | undefined;
      id?: string | undefined;
    }
  | {
      states: Record<string, DeepConfig>;
      id?: string | undefined;
      type?: import('./types').StateType | undefined;
    };
