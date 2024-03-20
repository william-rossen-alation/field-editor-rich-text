import { assertOutput, jsx } from '../../../test-utils';
describe('normalization', ()=>{
    describe('Table', ()=>{
        it('removes empty table nodes', ()=>{
            const input = jsx("editor", null, jsx("htable", null));
            const expected = jsx("editor", null, jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('moves tables to the root level except nested tables', ()=>{
            const table = jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "Cell 1")), jsx("htd", null, jsx("hp", null, "Cell 2"))));
            const input = jsx("editor", null, jsx("hp", null, "hello", table), jsx("hquote", null, jsx("hp", null, "quote", table)), jsx("hul", null, jsx("hli", null, jsx("hp", null, "item", table))), jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell with table: ", table)))));
            const expected = jsx("editor", null, jsx("hp", null, "hello"), table, jsx("hquote", null, jsx("hp", null, "quote")), table, jsx("hul", null, jsx("hli", null, jsx("hp", null, "item"))), table, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell with table: "), jsx("hp", null, "Cell 1"), jsx("hp", null, "Cell 2")))), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('removes invalid children', ()=>{
            const input = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "Cell 1")), jsx("htd", null, jsx("hp", null, "Cell 2"))), jsx("htd", null, "invalid cell"), "invalid text"), jsx("hp", null));
            const expected = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "Cell 1")), jsx("htd", null, jsx("hp", null, "Cell 2")))), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
    });
    describe('Table cell', ()=>{
        it('converts invalid children to paragraphs', ()=>{
            const input = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "Cell 1")), jsx("htd", null, jsx("hp", null, "Cell 2"), jsx("hquote", null, jsx("hp", null, jsx("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "quote"), jsx("hinline", {
                type: "Entry",
                id: "entry-id"
            })))))), jsx("hp", null));
            const expected = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "Cell 1")), jsx("htd", null, jsx("hp", null, "Cell 2"), jsx("hp", null, jsx("htext", {
                bold: true,
                italic: true,
                underline: true
            }, "quote"), jsx("hinline", {
                type: "Entry",
                id: "entry-id"
            }), jsx("htext", null))))), jsx("hp", null, jsx("htext", null)));
            assertOutput({
                input,
                expected
            });
        });
    });
    describe('Table row', ()=>{
        it('must be wrapped in a table', ()=>{
            const input = jsx("editor", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell"))));
            const expected = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell")))), jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('removes empty rows', ()=>{
            const input = jsx("editor", null, jsx("htr", null));
            const expected = jsx("editor", null, jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('wraps invalid children in table cells', ()=>{
            const input = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("hp", null, "cell 2"))));
            const expected = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, "cell 2")))), jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
        it('ensures all table rows have the same width', ()=>{
            const input = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1"))), jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 2")), jsx("htd", null, jsx("hp", null, "cell 3")), jsx("htd", null, jsx("hp", null, "cell 4"))), jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 5")), jsx("htd", null, jsx("hp", null, "cell 6")))));
            const expected = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 1")), jsx("htd", null, jsx("hp", null, jsx("text", null))), jsx("htd", null, jsx("hp", null, jsx("text", null)))), jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 2")), jsx("htd", null, jsx("hp", null, "cell 3")), jsx("htd", null, jsx("hp", null, "cell 4"))), jsx("htr", null, jsx("htd", null, jsx("hp", null, "cell 5")), jsx("htd", null, jsx("hp", null, "cell 6")), jsx("htd", null, jsx("hp", null, jsx("text", null))))), jsx("hp", null, jsx("text", null)));
            assertOutput({
                input,
                expected
            });
        });
    });
});
