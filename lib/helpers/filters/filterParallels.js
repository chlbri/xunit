"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterParallels = void 0;
function filterParallels(history, parallelsWithChildren) {
    if (!history || !parallelsWithChildren) {
        return;
    }
    let position = -1;
    let childrenNumber = -1;
    return history.filter((value, i) => {
        let out = true;
        parallelsWithChildren.forEach(parallel => {
            var _a, _b;
            if (parallel.id === value.currentState) {
                position = i;
                childrenNumber = (_b = (_a = parallel.grandChildren) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            }
        });
        if (position > -1 && childrenNumber > -1) {
            out = i > position + childrenNumber || i === position;
            if (i > position + childrenNumber + 1) {
                position = childrenNumber = -1;
            }
        }
        return out;
    });
}
exports.filterParallels = filterParallels;
