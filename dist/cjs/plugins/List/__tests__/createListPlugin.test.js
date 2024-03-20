"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('normalization', ()=>{
    it('wraps orphaned list items in a list', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item")), (0, _testutils.jsx)("hp", null));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item"))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
    it('adds empty paragraph to empty list items', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null)), (0, _testutils.jsx)("hp", null));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
    it('replaces invalid list items with text', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item"), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", {
            bold: true
        }, "bold text"))), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Take a look at this ", (0, _testutils.jsx)("hlink", {
            uri: "https://google.com"
        }, "link"))))), (0, _testutils.jsx)("hp", null));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", {
            bold: true
        }, "bold text")), (0, _testutils.jsx)("hp", null, "Take a look at this ", (0, _testutils.jsx)("hlink", {
            uri: "https://google.com"
        }, "link"), (0, _testutils.jsx)("htext", null)))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
    it('replaces list items with nested lists as a first child', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 1.1")))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 2.1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 2.1.1")))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 2.2"))))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 1.1")))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 2.1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 2.1.1")))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Item 2.2"))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
});
