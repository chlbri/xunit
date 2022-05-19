"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecursiveTestAction = void 0;
const helpers_1 = require("./helpers");
function addActions(config) {
    return (0, helpers_1.addEntryAction)((0, helpers_1.addTestAction)(config));
}
function addRecursiveTestAction(config, parentIsParallel = false) {
    const __config = { ...config };
    const _isParallel = (0, helpers_1.isParallel)(__config);
    const _config = parentIsParallel || (!_isParallel && (0, helpers_1.hasChildrenStates)(__config))
        ? (0, helpers_1.addTestAction)(__config)
        : addActions(__config);
    if (!(0, helpers_1.hasChildrenStates)(_config)) {
        return _config;
    }
    Object.entries(_config.states).forEach(([key, value]) => {
        _config.states[key] = {
            ...addRecursiveTestAction(value, _isParallel),
        };
    });
    return _config;
}
exports.addRecursiveTestAction = addRecursiveTestAction;
