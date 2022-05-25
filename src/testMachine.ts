import { nanoid } from 'nanoid';
import {
  BaseActionObject,
  EventObject,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from 'xstate';
import { DEFAULT_WAIT_BETWEEN_EVENT } from './constants';
import { useMachine } from './hooks/useMachine';
import { History, TestsProps, Waiter } from './types';

type Helpers<TC> = {
  containsStateIds?: string[];
  containsContexts?: TC[];
  history?: History<TC>[];
};

export async function testMachine<
  TC,
  TE extends EventObject,
  TA extends BaseActionObject = BaseActionObject,
  TS extends ServiceMap = ServiceMap,
  TR = ResolveTypegenMeta<TypegenDisabled, NoInfer<TE>, TA, TS>,
  ASYNC extends boolean | undefined = undefined,
>({
  containsStateIds,
  containsContexts,
  history,
  ...props
}: TestsProps<TC, TE, TA, TS, TR, ASYNC> & Helpers<TC>) {
  const { sender, results, id } = useMachine(props);
  let timer = DEFAULT_WAIT_BETWEEN_EVENT;
  if (props.async) {
    const waitEvents = props.events as Waiter<TE>[] | undefined;
    if (waitEvents) {
      timer +=
        waitEvents.reduce(
          (acc, curr) => acc + (curr.wait ?? DEFAULT_WAIT_BETWEEN_EVENT),
          0,
        ) * 1.5;
    }
  }
  describe(`${nanoid(6)}-/ ID: ${id} =>`, () => {
    if (props.useFakeTimers) {
      jest.useFakeTimers();
    }

    beforeAll(sender, timer * 2);

    containsStateIds &&
      it('Results Contains IDS', () => {
        const ids = results()?.map(r => r.currentState);
        expect(ids).toContainValues(containsStateIds);
      });

    containsContexts &&
      it('Results Contains Contexts', () => {
        const contexts = results()?.map(r => r.currentContext);
        expect(contexts).toContainValues(containsContexts);
      });

    history &&
      it('The history', () => {
        const _history = results();
        expect(_history).toEqual(history);
      });
  });
}
