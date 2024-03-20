import { jsx, assertOutput, createTestEditor } from '../../../test-utils';
describe('insert fragment', ()=>{
    const tests = [
        {
            title: 'text wrapped in li > p',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello ", jsx("cursor", null)))),
            fragment: jsx("fragment", null, jsx("hli", null, jsx("hp", null, "world"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello world")))
        },
        {
            title: 'text wrapped in li > h*',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello ", jsx("cursor", null)))),
            fragment: jsx("fragment", null, jsx("hli", null, jsx("hh1", null, "world"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello world")))
        },
        {
            title: 'single li with only asset card',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello", jsx("cursor", null), "world"))),
            fragment: jsx("fragment", null, jsx("hli", null, jsx("hembed", {
                type: "Asset",
                id: "asset-id"
            }))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello"), jsx("hembed", {
                type: "Asset",
                id: "asset-id"
            }), jsx("hp", null, "world")))
        },
        {
            title: 'two paragraphs',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello ", jsx("cursor", null)))),
            fragment: jsx("fragment", null, jsx("hp", null, "world"), jsx("hp", null, "line 2")),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello world"), jsx("hp", null, "line 2")))
        },
        {
            title: 'two headings',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello ", jsx("cursor", null)))),
            fragment: jsx("fragment", null, jsx("hh1", null, "world"), jsx("hh1", null, "line 2")),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello world"), jsx("hh1", null, "line 2")))
        },
        {
            title: 'two paragraphs wrapped in a li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello ", jsx("cursor", null)))),
            fragment: jsx("fragment", null, jsx("hli", null, jsx("hp", null, "world"), jsx("hp", null, "line 2"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "hello "), jsx("hul", null, jsx("hli", null, jsx("hp", null, "world"), jsx("hp", null, "line 2")))))
        }
    ];
    const render = (children)=>jsx("editor", null, children, jsx("hp", null, jsx("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = createTestEditor({
                input: render(t.input)
            });
            editor.insertFragment(t.fragment);
            assertOutput({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
