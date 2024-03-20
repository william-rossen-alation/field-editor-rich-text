import { assertOutput, jsx } from '../../../test-utils';
describe('normalization', ()=>{
    it('wraps orphaned list items in a list', ()=>{
        const input = jsx("editor", null, jsx("hli", null, jsx("hp", null, "Item")), jsx("hp", null));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item"))), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
    it('adds empty paragraph to empty list items', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null)), jsx("hp", null));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("htext", null)))), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
    it('replaces invalid list items with text', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item"), jsx("htd", null, jsx("hp", null, jsx("htext", {
            bold: true
        }, "bold text"))), jsx("htd", null, jsx("hp", null, "Take a look at this ", jsx("hlink", {
            uri: "https://google.com"
        }, "link"))))), jsx("hp", null));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item"), jsx("hp", null, jsx("htext", {
            bold: true
        }, "bold text")), jsx("hp", null, "Take a look at this ", jsx("hlink", {
            uri: "https://google.com"
        }, "link"), jsx("htext", null)))), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
    it('replaces list items with nested lists as a first child', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 1.1")))), jsx("hli", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 2.1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 2.1.1")))), jsx("hli", null, jsx("hp", null, "Item 2.2"))))), jsx("hp", null, jsx("htext", null)));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 1.1")))), jsx("hli", null, jsx("hp", null, "Item 2.1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "Item 2.1.1")))), jsx("hli", null, jsx("hp", null, "Item 2.2"))), jsx("hp", null, jsx("htext", null)));
        assertOutput({
            input,
            expected
        });
    });
});
