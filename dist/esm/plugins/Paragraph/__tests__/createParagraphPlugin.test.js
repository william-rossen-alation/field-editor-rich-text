import { assertOutput, jsx } from '../../../test-utils';
describe('normalization', ()=>{
    it('can contain inline entries & hyperlinks', ()=>{
        const input = jsx("editor", null, jsx("hp", null, "some text before", jsx("hinline", {
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
        }), "some text after"));
        assertOutput({
            input,
            expected: input
        });
    });
    it('wraps orphaned text nodes in a paragraph', ()=>{
        const input = jsx("editor", null, jsx("hp", null, "valid text"), jsx("hh1", null, "valid text"), jsx("htable", null, jsx("htr", null, jsx("htd", null, "invalid text"))));
        const expected = jsx("editor", null, jsx("hp", null, "valid text"), jsx("hh1", null, "valid text"), jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "invalid text")))), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
    it('unwraps nested paragraphs', ()=>{
        const input = jsx("editor", null, jsx("hp", null, "some", jsx("hp", null, jsx("htext", {
            bold: true,
            italic: true,
            underline: true
        }, "paragraph")), "text"));
        const expected = jsx("editor", null, jsx("hp", null, "some", jsx("htext", {
            bold: true,
            italic: true,
            underline: true
        }, "paragraph"), "text"));
        assertOutput({
            input,
            expected
        });
    });
    describe('lifts other invalid children', ()=>{
        it('block void elements', ()=>{
            const input = jsx("editor", null, jsx("hp", null, jsx("hembed", {
                type: "Asset",
                id: "1"
            }), " start"), jsx("hp", null, "end ", jsx("hembed", {
                type: "Asset",
                id: "2"
            })), jsx("hp", null, "in ", jsx("hembed", {
                type: "Asset",
                id: "3"
            }), " between"), jsx("hp", null, jsx("hembed", {
                type: "Entry",
                id: "1"
            }), " start"), jsx("hp", null, "end ", jsx("hembed", {
                type: "Entry",
                id: "2"
            })), jsx("hp", null, "in ", jsx("hembed", {
                type: "Entry",
                id: "3"
            }), " between"), jsx("hp", null, jsx("hhr", null), " start"), jsx("hp", null, "end ", jsx("hhr", null)), jsx("hp", null, "in ", jsx("hhr", null), " between"));
            const expected = jsx("editor", null, jsx("hembed", {
                type: "Asset",
                id: "1"
            }), jsx("hp", null, " start"), jsx("hp", null, "end "), jsx("hembed", {
                type: "Asset",
                id: "2"
            }), jsx("hp", null, "in "), jsx("hembed", {
                type: "Asset",
                id: "3"
            }), jsx("hp", null, " between"), jsx("hembed", {
                type: "Entry",
                id: "1"
            }), jsx("hp", null, " start"), jsx("hp", null, "end "), jsx("hembed", {
                type: "Entry",
                id: "2"
            }), jsx("hp", null, "in "), jsx("hembed", {
                type: "Entry",
                id: "3"
            }), jsx("hp", null, " between"), jsx("hhr", null), jsx("hp", null, " start"), jsx("hp", null, "end "), jsx("hhr", null), jsx("hp", null, "in "), jsx("hhr", null), jsx("hp", null, " between"));
            assertOutput({
                input,
                expected
            });
        });
        it('handles heading', ()=>{
            const input = jsx("editor", null, jsx("hp", null, "some", jsx("hh1", null, "heading"), "text"));
            const expected = jsx("editor", null, jsx("hp", null, "some"), jsx("hh1", null, "heading"), jsx("hp", null, "text"));
            assertOutput({
                input,
                expected
            });
        });
        it('handles quotes', ()=>{
            const input = jsx("editor", null, jsx("hp", null, "some", jsx("hquote", null, jsx("hp", null, "quote")), "text"));
            const expected = jsx("editor", null, jsx("hp", null, "some"), jsx("hquote", null, jsx("hp", null, "quote")), jsx("hp", null, "text"));
            assertOutput({
                input,
                expected
            });
        });
        it('handles lists', ()=>{
            const input = jsx("editor", null, jsx("hp", null, "some", jsx("hul", null, jsx("hli", null, jsx("hp", null, "list item"))), "text"));
            const expected = jsx("editor", null, jsx("hp", null, "some"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "list item"))), jsx("hp", null, "text"));
            assertOutput({
                input,
                expected
            });
        });
        it('handles tables', ()=>{
            const input = jsx("editor", null, jsx("hp", null, "some", jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, "cell 2")))), "text"));
            const expected = jsx("editor", null, jsx("hp", null, "some"), jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, "cell 2")))), jsx("hp", null, "text"));
            assertOutput({
                input,
                expected
            });
        });
    });
});
