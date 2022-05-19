import { Config } from '../../types';
export declare const addTestAction: (args: Config) => {
  after?:
    | Record<
        string | number,
        import('../../types').SingleOrArray<
          string | import('../../types').Transition
        >
      >
    | undefined;
  on?:
    | Record<
        string,
        import('../../types').SingleOrArray<
          string | import('../../types').Transition
        >
      >
    | undefined;
  always?:
    | import('../../types').SingleOrArray<
        string | import('../../types').Transition
      >
    | undefined;
  id?: string | undefined;
};
