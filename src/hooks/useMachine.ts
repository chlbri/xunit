import cloneDeep from 'lodash.clonedeep';
import {
  BaseActionObject,
  EventObject,
  interpret,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  StateValue,
  TypegenDisabled,
} from 'xstate';
import { DEFAULT_WAIT_BETWEEN_EVENT, TESTS_KEY } from '../constants';
import { filterParallels, sleep, sleepJest } from '../helpers';
import { transformMachineForTests } from '../transformMachineForTests';
import { ITestContext, TestsProps, Waiter } from '../types';

export function useMachine<
  TC,
  TE extends EventObject,
  TA extends BaseActionObject = BaseActionObject,
  TS extends ServiceMap = ServiceMap,
  TR = ResolveTypegenMeta<TypegenDisabled, NoInfer<TE>, TA, TS>,
  ASYNC extends boolean | undefined = undefined,
>(props: TestsProps<TC, TE, TA, TS, TR, ASYNC>) {
  const { machine, parallelsWithChildren } = transformMachineForTests(
    props.machine,
  );

  const id = machine.id;

  const initialContext = props.initialContext;
  const _machine = initialContext
    ? machine.withContext(initialContext)
    : machine;
  const initialState = props.initialState;

  const service = interpret(_machine).start(
    retrieveValue(id, initialState),
  );

  const sender = async () => {
    if (props.async === true) {
      props.async;
      const waitEvents = props.events as Waiter<TE>[] | undefined;
      if (waitEvents) {
        for (const waitEvent of waitEvents) {
          const timer = waitEvent.wait ?? DEFAULT_WAIT_BETWEEN_EVENT;
          if (props.useFakeTimers) {
            sleepJest(timer);
            service.send(waitEvent.event);
          } else {
            await sleep(timer).then(() => {
              service.send(waitEvent.event);
            });
          }
        }
      }
    } else {
      const events = props.events as TE[] | undefined;
      events?.forEach(event => {
        service.send(event);
      });
    }
  };

  const results = () => {
    const array1 = cloneDeep(
      (service.state.context as ITestContext<TC>)[TESTS_KEY],
    );

    if (!!initialContext && !!initialState) {
      array1?.unshift({
        currentState: initialState,
        currentContext: initialContext ?? ({} as any),
      });
    } else if (!!initialState) {
      const { __tests__, ...currentContext } =
        machine.initialState.context;

      array1?.unshift({
        currentState: initialState,
        currentContext,
      });
    }
    return filterParallels(array1, parallelsWithChildren);
  };

  return { sender, results, id } as const;
}

function concatValue(id: string, value: StateValue) {
  if (typeof value === 'object') {
    return {
      [id]: value,
    };
  }
  return `${id}.${value}`;
}

function retrieveValue(id: string, value?: StateValue) {
  if (typeof value === 'object') {
    return value[id];
  }
  const _value = value;
  return _value?.replace(id + '.', '');
}
