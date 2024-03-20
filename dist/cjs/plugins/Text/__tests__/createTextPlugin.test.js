"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('delete backward', ()=>{
    const tests = [
        {
            title: 'deletes a character of the text inside li',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p", (0, _testutils.jsx)("cursor", null))))
        },
        {
            title: 'does not delete the very first paragraph',
            input: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null, "text")),
            expected: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null, "text"))
        }
    ];
    const render = (children)=>(0, _testutils.jsx)("editor", null, children, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = (0, _testutils.createTestEditor)({
                input: render(t.input)
            });
            editor.deleteBackward('character');
            (0, _testutils.assertOutput)({
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
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "p1"))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "1")))
        },
        {
            title: 'deletes the first paragraph when followed by another paragraph',
            input: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null, "text")),
            expected: (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "text")
        },
        {
            title: 'deletes the first paragraph when followed by li',
            input: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1")))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "p1")))
        },
        {
            title: 'deletes the first paragraph when followed by a blockquote',
            input: (0, _testutils.jsx)("fragment", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "p1"))),
            expected: (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("cursor", null), "p1"))
        }
    ];
    const render = (children)=>(0, _testutils.jsx)("editor", null, children, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
    for (const t of tests){
        test(t.title, ()=>{
            const { editor } = (0, _testutils.createTestEditor)({
                input: render(t.input)
            });
            editor.deleteForward('character');
            (0, _testutils.assertOutput)({
                editor,
                expected: render(t.expected)
            });
        });
    }
});
