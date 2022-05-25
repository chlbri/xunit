import {
  BaseActionObject,
  createMachine,
  EventObject,
  interpret,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
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

  const initialC = props.initialContext;
  const _machine = initialC ? machine.withContext(initialC) : machine;

  const service = interpret(_machine).start(props.initialState);

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

  const results = () =>
    filterParallels(
      (service.state.context as ITestContext<TC>)[TESTS_KEY],
      parallelsWithChildren,
    );

  return { sender, results, id } as const;
}

const mach = createMachine({
  context: {},
});

useMachine({
  machine: mach,
  events: ['TEST'],
});
