"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectGrandChildFromParallelRecursive = void 0;
const actions_1 = require("../actions");
const collectGrandChildFromParallel_1 = require("./collectGrandChildFromParallel");
function collectGrandChildFromParallelRecursive(config) {
    return (0, actions_1.flatten)(config)
        .map(collectGrandChildFromParallel_1.collectGrandChildFromParallel)
        .filter(value => {
        return (!!value.id &&
            !!value.grandChildren &&
            value.grandChildren.length > 0);
    });
}
exports.collectGrandChildFromParallelRecursive = collectGrandChildFromParallelRecursive;
