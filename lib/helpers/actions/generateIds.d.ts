import { DeepConfig } from '../../types';
declare type ConcatProps = {
  text: string;
  separator?: string;
  args?: (string | undefined)[];
};
export declare function concatId({
  text,
  separator,
  args,
}: ConcatProps): string;
export declare const generateIds: (config: DeepConfig) => {
  id?: string | undefined;
  on?:
    | Record<
        string,
        import('../../types').SingleOrArray<
          string | import('../../types').Transition
        >
      >
    | undefined;
  after?:
    | Record<
        string | number,
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
  type?: import('../../types').StateType | undefined;
  entry?: any;
  initial?: string | undefined;
  states?: Record<string, DeepConfig> | undefined;
};
export {};
