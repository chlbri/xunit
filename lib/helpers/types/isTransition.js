"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransition = void 0;
function isTransition(arg) {
    return (typeof arg === 'object' &&
        arg !== null &&
        ('target' in arg || 'actions' in arg));
}
exports.isTransition = isTransition;
