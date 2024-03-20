import { jsx, assertOutput, createTestEditor } from '../../../test-utils';
describe('delete backward', ()=>{
    const tests = [
        {
            title: 'deletes a character of the text inside li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p", jsx("cursor", null))))
        },
        {
            title: 'does not delete the very first paragraph',
            input: jsx("fragment", null, jsx("hp", null, jsx("cursor", null)), jsx("hp", null, "text")),
            expected: jsx("fragment", null, jsx("hp", null, jsx("cursor", null)), jsx("hp", null, "text"))
        }
    ];
    const render = (children)=>jsx("editor", null, children, jsx("hp", null, jsx("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = createTestEditor({
                input: render(t.input)
            });
            editor.deleteBackward('character');
            assertOutput({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
describe('delete forward', ()=>{
    const tests = [
        {
            title: 'deletes a character of the text inside li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null), "p1"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null), "1")))
        },
        {
            title: 'deletes the first paragraph when followed by another paragraph',
            input: jsx("fragment", null, jsx("hp", null, jsx("cursor", null)), jsx("hp", null, "text")),
            expected: jsx("hp", null, jsx("cursor", null), "text")
        },
        {
            title: 'deletes the first paragraph when followed by li',
            input: jsx("fragment", null, jsx("hp", null, jsx("cursor", null)), jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1")))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null), "p1")))
        },
        {
            title: 'deletes the first paragraph when followed by a blockquote',
            input: jsx("fragment", null, jsx("hp", null, jsx("cursor", null)), jsx("hquote", null, jsx("hp", null, "p1"))),
            expected: jsx("hquote", null, jsx("hp", null, jsx("cursor", null), "p1"))
        }
    ];
    const render = (children)=>jsx("editor", null, children, jsx("hp", null, jsx("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = createTestEditor({
                input: render(t.input)
            });
            editor.deleteForward('character');
            assertOutput({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
