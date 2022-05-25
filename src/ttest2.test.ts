import { NExclude } from '@bemedev/types';
import { assign, createMachine } from 'xstate';
import { testMachine } from './testMachine';

// #region config
export const CLIENT_ERRORS = {
  401: 'No envrionnement variables are set',
  402: 'No Internet',
  403: 'Request is empty',
  404: 'Request is not well formated',
  405: 'No headers',
} as const;

export const SERVER_ERRORS = {
  501: 'Endpoint not found',
  502: 'Request not implemented',
  503: 'No response',
  504: 'Internal Error',
  505: 'Unexpected Error',
} as const;

export const PERMISSION_ERRORS = {
  601: 'No permissions for this Request',
  602: 'No headers',
  603: 'Not authorized at Headers',
  605: 'No permission for "Name"',
  606: 'No permission for "Phone"',
  607: 'No permission for "Email"',
  608: 'No permission for "Message"',
} as const;

export const WARNINGS = {
  101: 'This request is deprecated',
  102: 'This request takes too much time',
} as const;

export type TE = {
  type: 'REQUEST' | 'OK';
  request: string;
  headers?: { [key: string]: string };
};

export type PermissionError = keyof typeof PERMISSION_ERRORS;
export type ServerError = keyof typeof SERVER_ERRORS;
export type ClientError = keyof typeof CLIENT_ERRORS;
export type Warning = keyof typeof WARNINGS;

export type TC = {
  data?: {
    name?: string;
    phone?: {
      value: string;
      countryID: number;
    };
    email?: string;
    message?: string;
  };
  internal?: {
    permissionErrors: PermissionError[];
    serverErrors: NExclude<ServerError, 505>[];
    warnings: Warning[];
  };
  request?: string;
  headers?: { [key: string]: string };
  permissionErrors: PermissionError[];
  clientErrors: ClientError[];
  serverErrors: ServerError[];
  warnings: Warning[];
};

type FetchProps = {
  request?: string;
  headers?: { [key: string]: string };
};

async function request({ request, headers }: FetchProps) {
  const serverErrors: NExclude<ServerError, 505>[] = [];
  const permissionErrors: PermissionError[] = [];
  if (!headers) {
    permissionErrors.push(602);
  }
  if (request !== 'endpoint') {
    serverErrors.push(501);
  }

  if (headers?.authorization !== 'BEARER') {
    permissionErrors.push(603);
  }

  const out = {
    data: {
      name: 'Charles-Lévi BRI',
      phone: {
        value: '0759260709',
        countryID: 225,
      },
      email: 'bri_lvi@icloud.com',
      message: 'Test the machine',
    },
    permissionErrors,
    serverErrors,
    warnings: [],
  };
  return out;
}
// #endregion

export const machine = createMachine(
  {
    schema: {
      events: {} as TE,
      context: {} as TC,
      services: {
        request: { data: {} as TC['internal'] & { data?: TC['data'] } },
        checkEnv: { data: 0 },
      },
    },
    tsTypes: {} as import('./ttest2.test.typegen').Typegen0,
    context: {
      permissionErrors: [],
      clientErrors: [],
      serverErrors: [],
      warnings: [],
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          REQUEST: {
            target: 'checkingEnv',
            actions: [
              'assignRequest',
              'assignHeaders',
              'removeErrors_noEnv',
            ],
          },
        },
      },
      checkingEnv: {
        // id: 'checkingEnv',
        invoke: {
          src: 'checkEnv',
          onDone: 'checkingClientErrors',
          onError: { target: 'idle', actions: 'addErrors_noEnv' },
        },
      },
      checkingClientErrors: {
        // id: 'checkingClientErrors',
        initial: 'noInternet',
        states: {
          noInternet: {
            always: [
              {
                cond: 'noInternet',
                actions: 'addError_noInternet',
                target: 'requestIsEmpty',
              },
              'requestIsEmpty',
            ],
          },
          requestIsEmpty: {
            always: [
              {
                cond: 'requestIsEmpty',
                actions: 'addError_requestIsEmpty',
                target: 'requestNotWellFormated',
              },
              'requestNotWellFormated',
            ],
          },
          requestNotWellFormated: {
            always: [
              {
                cond: 'requestNotWellFormated',
                actions: 'addError_requestNotWellFormated',
                target: 'noHeaders',
              },
              'noHeaders',
            ],
          },
          noHeaders: {
            always: [
              {
                cond: 'noHeaders',
                actions: 'addError_noHeaders',
                target: 'requesting',
              },
              'requesting',
            ],
          },
          requesting: {
            always: [
              {
                cond: 'hasClientErrors',
                target: '#clientError',
              },
              '#requesting',
            ],
          },
        },
      },
      clientError: {
        id: 'clientError',
        type: 'final',
      },
      requesting: {
        id: 'requesting',
        invoke: {
          src: 'request',
          onDone: {
            target: 'checkingServerErrors',
            actions: ['assignInternal', 'assignData'],
          },
          onError: {
            target: 'serverError',
            actions: 'addError_unexpectedServerError',
          },
        },
      },
      checkingServerErrors: {
        // id: 'checkingServerErrors',
        always: [
          {
            cond: 'hasServerErrors',
            actions: 'addServerErrors',
            target: 'serverError',
          },
          'checkingPermissionErrors',
        ],
      },
      serverError: {
        // id: 'serverError',
        type: 'final',
      },
      checkingPermissionErrors: {
        // id: 'checkingPermissionErrors',
        always: [
          {
            cond: 'hasPermissionErrors',
            actions: 'addPermissionErrors',
            target: 'permissionError',
          },
          'checkingWarnings',
        ],
      },
      permissionError: {
        // id: 'permissionError',
        type: 'final',
      },
      checkingWarnings: {
        // id: 'checkingWarnings',
        always: [
          {
            cond: 'hasWarnings',
            actions: 'addWarnings',
            target: 'warning',
          },
          'success',
        ],
      },
      warning: {
        // id: 'warning',
        type: 'final',
      },
      success: {
        // id: 'success',
        type: 'final',
      },
    },
  },
  {
    guards: {
      requestNotWellFormated: () => false,
      requestIsEmpty: ({ request }) => !request || request.trim() === '',
      noInternet: () => false,
      hasClientErrors: ({ clientErrors }) => clientErrors.length > 0,
      noHeaders: () => false,

      hasServerErrors: ({ internal }) => {
        const length = internal?.serverErrors?.length;
        return length ? length > 0 : false;
      },
      hasPermissionErrors: ({ internal }) => {
        const length = internal?.permissionErrors?.length;
        return length ? length > 0 : false;
      },
      hasWarnings: ({ internal }) => {
        const length = internal?.warnings?.length;
        return length ? length > 0 : false;
      },
    },
    actions: {
      assignRequest: assign({
        request: (_, { request }) => request,
      }),
      assignHeaders: assign({
        headers: (_, { headers }) => headers,
      }),
      removeErrors_noEnv: assign({
        clientErrors: ({ clientErrors }) =>
          clientErrors.filter(code => code !== 401),
      }),

      // #region Client Errors
      addErrors_noEnv: assign({
        clientErrors: ({ clientErrors }) => {
          const out = [...clientErrors];
          out.push(401);
          return out;
        },
      }),

      addError_noInternet: assign({
        clientErrors: ({ clientErrors }) => {
          const out = [...clientErrors];
          out.push(402);
          return out;
        },
      }),

      addError_requestIsEmpty: assign({
        clientErrors: ({ clientErrors }) => {
          const out = [...clientErrors];
          out.push(403);
          return out;
        },
      }),
      addError_requestNotWellFormated: assign({
        clientErrors: ({ clientErrors }) => {
          const out = [...clientErrors];
          out.push(404);
          return out;
        },
      }),

      addError_noHeaders: assign({
        clientErrors: ({ clientErrors }) => {
          const out = [...clientErrors];
          out.push(405);
          return out;
        },
      }),
      // #endregion

      assignInternal: assign({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        internal: (_, { data: { data, ...rest } }) => rest,
      }),

      assignData: assign({
        data: (_, { data: { data } }) => data,
      }),

      // #region Server Errors
      addError_unexpectedServerError: assign({
        serverErrors: ({ serverErrors }) => {
          const out = [...serverErrors];
          out.push(505);
          return out;
        },
      }),

      addServerErrors: assign({
        serverErrors: ({ internal }) => internal?.serverErrors ?? [],
      }),
      // #endregion

      addPermissionErrors: assign({
        permissionErrors: ({ internal }) =>
          internal?.permissionErrors ?? [],
      }),

      addWarnings: assign({
        warnings: ({ internal }) => internal?.warnings ?? [],
      }),
    },
    services: {
      request,
      checkEnv: async () => {
        return 0;
      },
    },
  },
);

describe('Event ==> (request: "endpoint", no headers)', () => {
  testMachine({
    async: true,
    machine,
    events: [
      {
        event: {
          type: 'REQUEST',
          request: 'endpoint',
          // headers: { authorization: 'BEARER' },
        },
      },
    ],
    history: [
      {
        currentState: '(machine).idle',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
        },
      },
      {
        currentState: '(machine).checkingEnv',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState: '(machine).checkingClientErrors.noInternet',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState: '(machine).checkingClientErrors.requestIsEmpty',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState:
          '(machine).checkingClientErrors.requestNotWellFormated',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState: '(machine).checkingClientErrors.noHeaders',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState: '(machine).checkingClientErrors.requesting',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState: 'requesting',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
        },
      },
      {
        currentState: '(machine).checkingServerErrors',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
          internal: {
            permissionErrors: [602, 603],
            serverErrors: [],
            warnings: [],
          },
          data: {
            name: 'Charles-Lévi BRI',
            phone: {
              value: '0759260709',
              countryID: 225,
            },
            email: 'bri_lvi@icloud.com',
            message: 'Test the machine',
          },
        },
      },
      {
        currentState: '(machine).checkingPermissionErrors',
        currentContext: {
          permissionErrors: [],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
          internal: {
            permissionErrors: [602, 603],
            serverErrors: [],
            warnings: [],
          },
          data: {
            name: 'Charles-Lévi BRI',
            phone: {
              value: '0759260709',
              countryID: 225,
            },
            email: 'bri_lvi@icloud.com',
            message: 'Test the machine',
          },
        },
      },
      {
        currentState: '(machine).permissionError',
        currentContext: {
          permissionErrors: [602, 603],
          clientErrors: [],
          serverErrors: [],
          warnings: [],
          request: 'endpoint',
          internal: {
            permissionErrors: [602, 603],
            serverErrors: [],
            warnings: [],
          },
          data: {
            name: 'Charles-Lévi BRI',
            phone: {
              value: '0759260709',
              countryID: 225,
            },
            email: 'bri_lvi@icloud.com',
            message: 'Test the machine',
          },
        },
      },
    ],
  });
});
