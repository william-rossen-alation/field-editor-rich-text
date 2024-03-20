"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('insert fragment', ()=>{
    const tests = [
        {
            title: 'text wrapped in li > p',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello ", (0, _testutils.jsx)("cursor", null)))),
            fragment: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "world"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello world")))
        },
        {
            title: 'text wrapped in li > h*',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello ", (0, _testutils.jsx)("cursor", null)))),
            fragment: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, "world"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello world")))
        },
        {
            title: 'single li with only asset card',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello", (0, _testutils.jsx)("cursor", null), "world"))),
            fragment: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "asset-id"
            }))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello"), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "asset-id"
            }), (0, _testutils.jsx)("hp", null, "world")))
        },
        {
            title: 'two paragraphs',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello ", (0, _testutils.jsx)("cursor", null)))),
            fragment: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hp", null, "world"), (0, _testutils.jsx)("hp", null, "line 2")),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello world"), (0, _testutils.jsx)("hp", null, "line 2")))
        },
        {
            title: 'two headings',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello ", (0, _testutils.jsx)("cursor", null)))),
            fragment: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hh1", null, "world"), (0, _testutils.jsx)("hh1", null, "line 2")),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello world"), (0, _testutils.jsx)("hh1", null, "line 2")))
        },
        {
            title: 'two paragraphs wrapped in a li',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello ", (0, _testutils.jsx)("cursor", null)))),
            fragment: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "world"), (0, _testutils.jsx)("hp", null, "line 2"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "hello "), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "world"), (0, _testutils.jsx)("hp", null, "line 2")))))
        }
    ];
    const render = (children)=>(0, _testutils.jsx)("editor", null, children, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = (0, _testutils.createTestEditor)({
                input: render(t.input)
            });
            editor.insertFragment(t.fragment);
            (0, _testutils.assertOutput)({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
