"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
const _moveListItems = require("./moveListItems");
describe('moving list items (up/down)', ()=>{
    const renderEditor = (children)=>(0, _testutils.jsx)("editor", null, children, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
    const assertTab = (t, shift = false)=>{
        test(t.title, ()=>{
            const { editor } = (0, _testutils.createTestEditor)({
                input: renderEditor(t.input)
            });
            (0, _moveListItems.moveListItems)(editor, {
                increase: !shift
            });
            (0, _testutils.assertOutput)({
                editor,
                expected: renderEditor(t.expected)
            });
        });
    };
    const tests = [
        {
            title: 'single paragraph',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null))))))
        },
        {
            title: 'multiple paragraphs',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hp", null, "p2")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p3", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hp", null, "p2"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p3", (0, _testutils.jsx)("cursor", null))))))
        },
        {
            title: 'multiple elements',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "a"), (0, _testutils.jsx)("hp", null, "b"), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "quote"))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "c", (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null, "d"), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "asset-id"
            }))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "a"), (0, _testutils.jsx)("hp", null, "b"), (0, _testutils.jsx)("hquote", null, (0, _testutils.jsx)("hp", null, "quote")), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "c", (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null, "d"), (0, _testutils.jsx)("hembed", {
                type: "Asset",
                id: "asset-id"
            })))))
        },
        {
            title: 'with a sub-list',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "sub p1")))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "sub p1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null))))))
        },
        {
            title: 'with a sub-list as non-last child',
            input: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "sub p1"))), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "entry-id"
            })), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null)))),
            expected: (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "sub p1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "p2", (0, _testutils.jsx)("cursor", null)))), (0, _testutils.jsx)("hembed", {
                type: "Entry",
                id: "entry-id"
            })))
        }
    ];
    describe('move down (aka. tab)', ()=>{
        tests.forEach((t)=>assertTab(t));
    });
    describe('move up (aka. shift+tab)', ()=>{
        tests.map((t)=>({
                ...t,
                input: t.expected,
                expected: t.input
            })).forEach((t)=>assertTab(t, true));
    });
});
