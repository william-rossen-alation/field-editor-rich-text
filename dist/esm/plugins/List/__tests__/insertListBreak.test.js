import { jsx, assertOutput, createTestEditor } from '../../../test-utils';
describe('insert line break', ()=>{
    const tests = [
        {
            title: 'at the start of a li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null), "p1"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null))), jsx("hli", null, jsx("hp", null, "p1")))
        },
        {
            title: 'at the end of a li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1")), jsx("hli", null, jsx("hp", null, jsx("cursor", null))))
        },
        {
            title: 'at the middle of a li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "split ", jsx("cursor", null), "me"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "split ")), jsx("hli", null, jsx("hp", null, jsx("cursor", null), "me")))
        },
        {
            title: 'at the start of a li with multiple p',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null), "p1"), jsx("hp", null, "p2"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null))), jsx("hli", null, jsx("hp", null, "p1"), jsx("hp", null, "p2")))
        },
        {
            title: 'at the start of the second p of a li',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hp", null, jsx("cursor", null), "p2"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1")), jsx("hli", null, jsx("hp", null, jsx("cursor", null)), jsx("hp", null, "p2")))
        },
        {
            title: 'at the end of a li with multiple p',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hp", null, "p2", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hp", null, "p2")), jsx("hli", null, jsx("hp", null, jsx("cursor", null))))
        },
        {
            title: 'at the middle of a li with multiple p',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "split ", jsx("cursor", null), "me"), jsx("hp", null, "move me"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "split ")), jsx("hli", null, jsx("hp", null, jsx("cursor", null), "me"), jsx("hp", null, "move me")))
        },
        {
            title: 'at the start of a li with heading',
            input: jsx("hul", null, jsx("hli", null, jsx("hh1", null, jsx("cursor", null), "p1"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("cursor", null))), jsx("hli", null, jsx("hh1", null, "p1")))
        },
        {
            title: 'at the end of a li with heading',
            input: jsx("hul", null, jsx("hli", null, jsx("hh1", null, "p1", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hh1", null, "p1")), jsx("hli", null, jsx("hp", null, jsx("cursor", null))))
        },
        {
            title: 'at the middle of a li with heading',
            input: jsx("hul", null, jsx("hli", null, jsx("hh1", null, "split ", jsx("cursor", null), "me"))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hh1", null, "split ")), jsx("hli", null, jsx("hh1", null, jsx("cursor", null), "me")))
        },
        {
            title: 'at a li with nested list',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "item 1")), jsx("hli", null, jsx("hp", null, "item 2", jsx("cursor", null)), jsx("hul", null, jsx("hli", null, jsx("hp", null, "sub list"))))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "item 1")), jsx("hli", null, jsx("hp", null, "item 2")), jsx("hli", null, jsx("hp", null, jsx("cursor", null)), jsx("hul", null, jsx("hli", null, jsx("hp", null, "sub list")))))
        }
    ];
    const render = (children)=>jsx("editor", null, children, jsx("hp", null, jsx("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = createTestEditor({
                input: render(t.input)
            });
            editor.insertBreak();
            assertOutput({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
