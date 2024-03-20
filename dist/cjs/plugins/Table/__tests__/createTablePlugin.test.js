"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('normalization', ()=>{
    describe('Table', ()=>{
        it('removes empty table nodes', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('moves tables to the root level except nested tables', ()=>{
            const table = (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 2"))));
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, "hello", table), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "quote", table)), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "item", table))), (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell with table: ", table)))));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, "hello"), table, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "quote")), table, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "item"))), table, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell with table: "), (0, _testutils.jsx)("hp", null, "Cell 1"), (0, _testutils.jsx)("hp", null, "Cell 2")))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('removes invalid children', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 2"))), (0, _testutils.jsx)("htd", null, "invalid cell"), "invalid text"), (0, _testutils.jsx)("hp", null));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 2")))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
    });
    describe('Table cell', ()=>{
        it('converts invalid children to paragraphs', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 2"), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "quote"), (0, _testutils.jsx)("hinline", {
                type: "Entry",
                id: "entry-id"
            })))))), (0, _testutils.jsx)("hp", null));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "Cell 2"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "quote"), (0, _testutils.jsx)("hinline", {
                type: "Entry",
                id: "entry-id"
            }), (0, _testutils.jsx)("htext", null))))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
    });
    describe('Table row', ()=>{
        it('must be wrapped in a table', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell"))));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell")))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('removes empty rows', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htr", null));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('wraps invalid children in table cells', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1")), (0, _testutils.jsx)("hp", null, "cell 2"))));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 2")))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('ensures all table rows have the same width', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1"))), (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 2")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 3")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 4"))), (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 5")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 6")))));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null))), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)))), (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 2")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 3")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 4"))), (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 5")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 6")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null))))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
    });
});
