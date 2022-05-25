// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignRequest: 'REQUEST';
    assignHeaders: 'REQUEST';
    removeErrors_noEnv: 'REQUEST';
    addErrors_noEnv: 'error.platform.(machine).checkingEnv:invocation[0]';
    addError_noInternet: '';
    addError_requestIsEmpty: '';
    addError_requestNotWellFormated: '';
    addError_noHeaders: '';
    assignInternal: 'done.invoke.requesting:invocation[0]';
    assignData: 'done.invoke.requesting:invocation[0]';
    addError_unexpectedServerError: 'error.platform.requesting:invocation[0]';
    addServerErrors: '';
    addPermissionErrors: '';
    addWarnings: '';
  };
  internalEvents: {
    'error.platform.(machine).checkingEnv:invocation[0]': {
      type: 'error.platform.(machine).checkingEnv:invocation[0]';
      data: unknown;
    };
    '': { type: '' };
    'done.invoke.requesting:invocation[0]': {
      type: 'done.invoke.requesting:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.requesting:invocation[0]': {
      type: 'error.platform.requesting:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    checkEnv: 'done.invoke.(machine).checkingEnv:invocation[0]';
    request: 'done.invoke.requesting:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    checkEnv: 'REQUEST';
    request: '';
  };
  eventsCausingGuards: {
    noInternet: '';
    requestIsEmpty: '';
    requestNotWellFormated: '';
    noHeaders: '';
    hasClientErrors: '';
    hasServerErrors: '';
    hasPermissionErrors: '';
    hasWarnings: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'checkingEnv'
    | 'checkingClientErrors'
    | 'checkingClientErrors.noInternet'
    | 'checkingClientErrors.requestIsEmpty'
    | 'checkingClientErrors.requestNotWellFormated'
    | 'checkingClientErrors.noHeaders'
    | 'checkingClientErrors.requesting'
    | 'clientError'
    | 'requesting'
    | 'checkingServerErrors'
    | 'serverError'
    | 'checkingPermissionErrors'
    | 'permissionError'
    | 'checkingWarnings'
    | 'warning'
    | 'success'
    | {
        checkingClientErrors?:
          | 'noInternet'
          | 'requestIsEmpty'
          | 'requestNotWellFormated'
          | 'noHeaders'
          | 'requesting';
      };
  tags: never;
}
