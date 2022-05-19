"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMachine = void 0;
const nanoid_1 = require("nanoid");
const constants_1 = require("./constants");
const useMachine_1 = require("./hooks/useMachine");
async function testMachine({ containsStateIds, containsContexts, history, ...props }) {
    const { sender, results, id } = (0, useMachine_1.useMachine)(props);
    let timer = constants_1.DEFAULT_WAIT_BETWEEN_EVENT;
    if (props.async) {
        const waitEvents = props.events;
        if (waitEvents) {
            timer +=
                waitEvents.reduce((acc, curr) => { var _a; return acc + ((_a = curr.wait) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_WAIT_BETWEEN_EVENT); }, 0) * 1.5;
        }
    }
    describe(`${(0, nanoid_1.nanoid)(6)}-/ ID: ${id} =>`, () => {
        if (props.useFakeTimers) {
            jest.useFakeTimers();
        }
        beforeAll(sender, timer * 2);
        containsStateIds &&
            it('Results Contains IDS', () => {
                var _a;
                const ids = (_a = results()) === null || _a === void 0 ? void 0 : _a.map(r => r.currentState);
                expect(ids).toContainValues(containsStateIds);
            });
        containsContexts &&
            it('Results Contains Contexts', () => {
                var _a;
                const contexts = (_a = results()) === null || _a === void 0 ? void 0 : _a.map(r => r.currentContext);
                expect(contexts).toContainValues(containsContexts);
            });
        history &&
            it('The history', () => {
                const _history = results();
                expect(_history).toStrictEqual(history);
            });
    });
}
exports.testMachine = testMachine;
