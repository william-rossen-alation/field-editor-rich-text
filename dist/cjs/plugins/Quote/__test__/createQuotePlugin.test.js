"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('normalization', ()=>{
    it('can contain inline entries & hyperlinks', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some text before", (0, _testutils.jsx)("hinline", {
            type: "Entry",
            id: "inline-entry"
        }), (0, _testutils.jsx)("hlink", {
            uri: "https://contentful.com"
        }), (0, _testutils.jsx)("hlink", {
            entry: "entry-id"
        }), (0, _testutils.jsx)("hlink", {
            resource: "resource-urn"
        }), (0, _testutils.jsx)("hlink", {
            asset: "asset-id"
        }), "some text after")));
        (0, _testutils.assertOutput)({
            input,
            expected: input
        });
    });
    it('unwraps nested quotes', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some"), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", {
            bold: true,
            italic: true,
            underline: true
        }, "paragraph"))), (0, _testutils.jsx)("hp", null, "text")));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", {
            bold: true,
            italic: true,
            underline: true
        }, "paragraph")), (0, _testutils.jsx)("hp", null, "text")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
    describe('lifts other invalid children', ()=>{
        it('block void elements', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "this"), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "1"
            }), (0, _testutils.jsx)("hp", null, "is"), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "1"
            }), (0, _testutils.jsx)("hp", null, "a blockquote"), (0, _testutils.jsx)("hhr", null), (0, _testutils.jsx)("hh1", null, "Heading 1")));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "this")), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "1"
            }), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "is")), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "1"
            }), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "a blockquote")), (0, _testutils.jsx)("hhr", null), (0, _testutils.jsx)("hh1", null, "Heading 1"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('handles lists', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some", (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "list item"))), "text")));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some")), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "list item"))), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "text")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('handles tables', ()=>{
            const table = (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 2"))));
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some", table, "text")));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "some")), table, (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "text")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("text", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
    });
});
