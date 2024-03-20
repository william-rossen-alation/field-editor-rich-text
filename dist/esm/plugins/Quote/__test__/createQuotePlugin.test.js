import { assertOutput, jsx } from '../../../test-utils';
describe('normalization', ()=>{
    it('can contain inline entries & hyperlinks', ()=>{
        const input = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some text before", jsx("hinline", {
            type: "Entry",
            id: "inline-entry"
        }), jsx("hlink", {
            uri: "https://contentful.com"
        }), jsx("hlink", {
            entry: "entry-id"
        }), jsx("hlink", {
            resource: "resource-urn"
        }), jsx("hlink", {
            asset: "asset-id"
        }), "some text after")));
        assertOutput({
            input,
            expected: input
        });
    });
    it('unwraps nested quotes', ()=>{
        const input = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some"), jsx("hquote", null, jsx("hp", null, jsx("htext", {
            bold: true,
            italic: true,
            underline: true
        }, "paragraph"))), jsx("hp", null, "text")));
        const expected = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some"), jsx("hp", null, jsx("htext", {
            bold: true,
            italic: true,
            underline: true
        }, "paragraph")), jsx("hp", null, "text")), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
    describe('lifts other invalid children', ()=>{
        it('block void elements', ()=>{
            const input = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "this"), jsx("hembed", {
                type: "Asset",
                id: "1"
            }), jsx("hp", null, "is"), jsx("hembed", {
                type: "Entry",
                id: "1"
            }), jsx("hp", null, "a blockquote"), jsx("hhr", null), jsx("hh1", null, "Heading 1")));
            const expected = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "this")), jsx("hembed", {
                type: "Asset",
                id: "1"
            }), jsx("hquote", null, jsx("hp", null, "is")), jsx("hembed", {
                type: "Entry",
                id: "1"
            }), jsx("hquote", null, jsx("hp", null, "a blockquote")), jsx("hhr", null), jsx("hh1", null, "Heading 1"), jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('handles lists', ()=>{
            const input = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some", jsx("hul", null, jsx("hli", null, jsx("hp", null, "list item"))), "text")));
            const expected = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some")), jsx("hul", null, jsx("hli", null, jsx("hp", null, "list item"))), jsx("hquote", null, jsx("hp", null, "text")), jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('handles tables', ()=>{
            const table = jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, "cell 2"))));
            const input = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some", table, "text")));
            const expected = jsx("editor", null, jsx("hquote", null, jsx("hp", null, "some")), table, jsx("hquote", null, jsx("hp", null, "text")), jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
    });
});
