"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasContextTests = void 0;
const constants_1 = require("../../constants");
const types_1 = require("../types");
const isObject_1 = require("../types/isObject");
function hasContextTests(value) {
    return (0, isObject_1.isObject)(value) && (0, types_1.isArray)(value[constants_1.TESTS_KEY]);
}
exports.hasContextTests = hasContextTests;
