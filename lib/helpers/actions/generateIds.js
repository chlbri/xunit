"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIds = exports.concatId = void 0;
const checkers_1 = require("../checkers");
function concatId({ text, separator = '.', args = [], }) {
    return [text, ...args]
        .filter(t => !!t)
        .reduce((acc, curr) => `${acc}${separator}${curr}`);
}
exports.concatId = concatId;
function _generateIds(config, first = true, text = '', args = []) {
    const _config = { ...config };
    if (first) {
        if (!_config.id)
            _config.id = '(machine)';
    }
    else {
        _config.id = concatId({ text, args });
    }
    if ((0, checkers_1.hasChildrenStates)(config)) {
        const children = Object.entries(config.states)
            .map(([key, value]) => ({
            [key]: _generateIds(value, false, _config.id, [key]),
        }))
            .reduce((acc, curr) => ({ ...acc, ...curr }), {});
        _config.states = children;
    }
    return _config;
}
const generateIds = (config) => _generateIds(config);
exports.generateIds = generateIds;
