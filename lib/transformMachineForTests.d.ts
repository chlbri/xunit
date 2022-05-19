import { StateMachine } from 'xstate';
export declare function transformMachineForTests(
  machine: StateMachine<any, any, any, any, any, any, any>,
): {
  readonly machine: StateMachine<
    any,
    any,
    any,
    {
      value: any;
      context: any;
    },
    import('xstate').BaseActionObject,
    import('xstate').ServiceMap,
    import('xstate').ResolveTypegenMeta<
      import('xstate').TypegenDisabled,
      any,
      import('xstate').BaseActionObject,
      import('xstate').ServiceMap
    >
  >;
  readonly parallelsWithChildren: {
    id?: string | undefined;
    grandChildren?: string[] | undefined;
  }[];
};
