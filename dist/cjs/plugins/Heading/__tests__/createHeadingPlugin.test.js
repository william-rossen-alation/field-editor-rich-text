"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('normalization', ()=>{
    it('can contain inline entries & hyperlinks', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some text before", (0, _testutils.jsx)("hinline", {
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
        }), "some text after"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected: input
        });
    });
    it('unwraps nested paragraphs', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "one", ' ', (0, _testutils.jsx)("hp", null, "two ", (0, _testutils.jsx)("hp", null, "three ")), "four"));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "one two three four"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
    describe('lifts other invalid children', ()=>{
        it('block void elements', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "1"
            }), " start"), (0, _testutils.jsx)("hh1", null, "end ", (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "2"
            })), (0, _testutils.jsx)("hh1", null, "in ", (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "3"
            }), " between"), (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "1"
            }), " start"), (0, _testutils.jsx)("hh1", null, "end ", (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "2"
            })), (0, _testutils.jsx)("hh1", null, "in ", (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "3"
            }), " between"), (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("hhr", null), " start"), (0, _testutils.jsx)("hh1", null, "end ", (0, _testutils.jsx)("hhr", null)), (0, _testutils.jsx)("hh1", null, "in ", (0, _testutils.jsx)("hhr", null), " between"));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "1"
            }), (0, _testutils.jsx)("hh1", null, " start"), (0, _testutils.jsx)("hh1", null, "end "), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "2"
            }), (0, _testutils.jsx)("hh1", null, "in "), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "3"
            }), (0, _testutils.jsx)("hh1", null, " between"), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "1"
            }), (0, _testutils.jsx)("hh1", null, " start"), (0, _testutils.jsx)("hh1", null, "end "), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "2"
            }), (0, _testutils.jsx)("hh1", null, "in "), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "3"
            }), (0, _testutils.jsx)("hh1", null, " between"), (0, _testutils.jsx)("hhr", null), (0, _testutils.jsx)("hh1", null, " start"), (0, _testutils.jsx)("hh1", null, "end "), (0, _testutils.jsx)("hhr", null), (0, _testutils.jsx)("hh1", null, "in "), (0, _testutils.jsx)("hhr", null), (0, _testutils.jsx)("hh1", null, " between"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('nested headings', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some", (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "paragraph")), "text"));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some"), (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "paragraph")), (0, _testutils.jsx)("hh1", null, "text"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('handles quotes', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some", (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "quote")), "text"));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some"), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "quote")), (0, _testutils.jsx)("hh1", null, "text"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('handles lists', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some", (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "list item"))), "text"));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "list item"))), (0, _testutils.jsx)("hh1", null, "text"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
        it('handles tables', ()=>{
            const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some", (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 2")))), "text"));
            const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hh1", null, "some"), (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 1")), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, "cell 2")))), (0, _testutils.jsx)("hh1", null, "text"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
            (0, _testutils.assertOutput)({
                input,
                expected
            });
        });
    });
});
