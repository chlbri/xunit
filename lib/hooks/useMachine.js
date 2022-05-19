"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMachine = void 0;
const xstate_1 = require("xstate");
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const transformMachineForTests_1 = require("../transformMachineForTests");
function useMachine(props) {
    const { machine, parallelsWithChildren } = (0, transformMachineForTests_1.transformMachineForTests)(props.machine);
    const id = machine.id;
    const service = (0, xstate_1.interpret)(machine).start();
    const sender = async () => {
        var _a;
        if (props.async === true) {
            props.async;
            const waitEvents = props.events;
            if (waitEvents) {
                for (const waitEvent of waitEvents) {
                    const timer = (_a = waitEvent.wait) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_WAIT_BETWEEN_EVENT;
                    if (props.useFakeTimers) {
                        (0, helpers_1.sleepJest)(timer);
                        service.send(waitEvent.event);
                    }
                    else {
                        await (0, helpers_1.sleep)(timer).then(() => {
                            service.send(waitEvent.event);
                        });
                    }
                }
            }
        }
        else {
            const events = props.events;
            events === null || events === void 0 ? void 0 : events.forEach(event => {
                service.send(event);
            });
        }
    };
    const results = () => (0, helpers_1.filterParallels)(service.state.context[constants_1.TESTS_KEY], parallelsWithChildren);
    return { sender, results, id };
}
exports.useMachine = useMachine;
const mach = (0, xstate_1.createMachine)({
    context: {},
});
useMachine({
    machine: mach,
    events: ['TEST'],
});
