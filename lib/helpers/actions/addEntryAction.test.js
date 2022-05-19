"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@bemedev/test");
const addEntryAction_1 = require("./addEntryAction");
const testAction_1 = require("../testAction");
describe('Entry action', () => {
    (0, test_1.ttest)({
        func: addEntryAction_1.addEntryAction,
        tests: [
            {
                invite: '#1',
                args: {},
                expected: {
                    entry: [(0, testAction_1.testAction)('')],
                },
            },
            {
                invite: '#2',
                args: {
                    id: 'id2',
                },
                expected: {
                    id: 'id2',
                    entry: [(0, testAction_1.testAction)('')],
                },
            },
            {
                invite: '#3',
                args: {
                    id: 'id3',
                    entry: 'action3',
                },
                expected: {
                    id: 'id3',
                    entry: ['action3', (0, testAction_1.testAction)('')],
                },
            },
            {
                invite: '#4',
                args: {
                    id: 'id4',
                    entry: ['action4a', 'action4b'],
                },
                expected: {
                    id: 'id4',
                    entry: ['action4a', 'action4b', (0, testAction_1.testAction)('')],
                },
            },
        ],
    });
});
