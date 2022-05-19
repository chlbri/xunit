"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepJest = exports.sleep = void 0;
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function sleepJest(ms) {
    return jest.advanceTimersByTime(ms);
}
exports.sleepJest = sleepJest;
