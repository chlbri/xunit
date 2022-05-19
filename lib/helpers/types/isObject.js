"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
function isObject(value) {
    return !!value && value !== null && typeof value === 'object';
}
exports.isObject = isObject;
