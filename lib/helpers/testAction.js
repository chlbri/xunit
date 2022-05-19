"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAction = void 0;
const immer_1 = require("@xstate/immer");
const constants_1 = require("../constants");
function testAction(key) {
    return (0, immer_1.assign)((ctx) => {
        var _a;
        constants_1.TESTS_KEY;
        const _ctx = { ...ctx };
        delete _ctx[constants_1.TESTS_KEY];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (!ctx[constants_1.TESTS_KEY]) {
            ctx[constants_1.TESTS_KEY] = [];
        }
        (_a = ctx[constants_1.TESTS_KEY]) === null || _a === void 0 ? void 0 : _a.push({
            currentState: key,
            currentContext: _ctx,
        });
    });
}
exports.testAction = testAction;
