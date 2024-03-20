"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('insert line break', ()=>{
    const tests = [
        {
            title: 'at the start of a li',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "p1"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1")))
        },
        {
            title: 'at the end of a li',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null))))
        },
        {
            title: 'at the middle of a li',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "split ", (0, _testutils.jsx)("cursor", null), "me"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "split ")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "me")))
        },
        {
            title: 'at the start of a li with multiple p',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "p1"), (0, _testutils.jsx)("hp", null, "p2"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hp", null, "p2")))
        },
        {
            title: 'at the start of the second p of a li',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "p2"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null, "p2")))
        },
        {
            title: 'at the end of a li with multiple p',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hp", null, "p2")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null))))
        },
        {
            title: 'at the middle of a li with multiple p',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "split ", (0, _testutils.jsx)("cursor", null), "me"), (0, _testutils.jsx)("hp", null, "move me"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "split ")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "me"), (0, _testutils.jsx)("hp", null, "move me")))
        },
        {
            title: 'at the start of a li with heading',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("cursor", null), "p1"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, "p1")))
        },
        {
            title: 'at the end of a li with heading',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, "p1", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, "p1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null))))
        },
        {
            title: 'at the middle of a li with heading',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, "split ", (0, _testutils.jsx)("cursor", null), "me"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, "split ")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hh1", null, (0, _testutils.jsx)("cursor", null), "me")))
        },
        {
            title: 'at a li with nested list',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "item 1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "item 2", (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "sub list"))))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "item 1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "item 2")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "sub list")))))
        }
    ];
    const render = (children)=>(0, _testutils.jsx)("editor", null, children, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = (0, _testutils.createTestEditor)({
                input: render(t.input)
            });
            editor.insertBreak();
            (0, _testutils.assertOutput)({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
