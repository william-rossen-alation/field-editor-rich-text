import { assertOutput, jsx } from '../../../test-utils';
describe('normalization', ()=>{
    it('can contain inline entries & hyperlinks', ()=>{
        const input = jsx("editor", null, jsx("hh1", null, "some text before", jsx("hinline", {
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
        }), "some text after"), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected: input
        });
    });
    it('unwraps nested paragraphs', ()=>{
        const input = jsx("editor", null, jsx("hh1", null, "one", ' ', jsx("hp", null, "two ", jsx("hp", null, "three ")), "four"));
        const expected = jsx("editor", null, jsx("hh1", null, "one two three four"), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
    describe('lifts other invalid children', ()=>{
        it('block void elements', ()=>{
            const input = jsx("editor", null, jsx("hh1", null, jsx("hembed", {
                type: "Asset",
                id: "1"
            }), " start"), jsx("hh1", null, "end ", jsx("hembed", {
                type: "Asset",
                id: "2"
            })), jsx("hh1", null, "in ", jsx("hembed", {
                type: "Asset",
                id: "3"
            }), " between"), jsx("hh1", null, jsx("hembed", {
                type: "Entry",
                id: "1"
            }), " start"), jsx("hh1", null, "end ", jsx("hembed", {
                type: "Entry",
                id: "2"
            })), jsx("hh1", null, "in ", jsx("hembed", {
                type: "Entry",
                id: "3"
            }), " between"), jsx("hh1", null, jsx("hhr", null), " start"), jsx("hh1", null, "end ", jsx("hhr", null)), jsx("hh1", null, "in ", jsx("hhr", null), " between"));
            const expected = jsx("editor", null, jsx("hembed", {
                type: "Asset",
                id: "1"
            }), jsx("hh1", null, " start"), jsx("hh1", null, "end "), jsx("hembed", {
                type: "Asset",
                id: "2"
            }), jsx("hh1", null, "in "), jsx("hembed", {
                type: "Asset",
                id: "3"
            }), jsx("hh1", null, " between"), jsx("hembed", {
                type: "Entry",
                id: "1"
            }), jsx("hh1", null, " start"), jsx("hh1", null, "end "), jsx("hembed", {
                type: "Entry",
                id: "2"
            }), jsx("hh1", null, "in "), jsx("hembed", {
                type: "Entry",
                id: "3"
            }), jsx("hh1", null, " between"), jsx("hhr", null), jsx("hh1", null, " start"), jsx("hh1", null, "end "), jsx("hhr", null), jsx("hh1", null, "in "), jsx("hhr", null), jsx("hh1", null, " between"), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('nested headings', ()=>{
            const input = jsx("editor", null, jsx("hh1", null, "some", jsx("hh1", null, jsx("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "paragraph")), "text"));
            const expected = jsx("editor", null, jsx("hh1", null, "some"), jsx("hh1", null, jsx("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "paragraph")), jsx("hh1", null, "text"), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('handles quotes', ()=>{
            const input = jsx("editor", null, jsx("hh1", null, "some", jsx("hquote", null, jsx("hp", null, "quote")), "text"));
            const expected = jsx("editor", null, jsx("hh1", null, "some"), jsx("hquote", null, jsx("hp", null, "quote")), jsx("hh1", null, "text"), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('handles lists', ()=>{
            const input = jsx("editor", null, jsx("hh1", null, "some", jsx("hul", null, jsx("hli", null, jsx("hp", null, "list item"))), "text"));
            const expected = jsx("editor", null, jsx("hh1", null, "some"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "list item"))), jsx("hh1", null, "text"), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('handles tables', ()=>{
            const input = jsx("editor", null, jsx("hh1", null, "some", jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, "cell 2")))), "text"));
            const expected = jsx("editor", null, jsx("hh1", null, "some"), jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, "cell 2")))), jsx("hh1", null, "text"), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
    });
});
