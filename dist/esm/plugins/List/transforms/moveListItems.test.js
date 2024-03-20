import { jsx, assertOutput, createTestEditor } from '../../../test-utils';
import { moveListItems } from './moveListItems';
describe('moving list items (up/down)', ()=>{
    const renderEditor = (children)=>jsx("editor", null, children, jsx("hp", null, jsx("htext", null)));
    const assertTab = (t, shift = false)=>{
        test(t.title, ()=>{
            const { editor } = createTestEditor({
                input: renderEditor(t.input)
            });
            moveListItems(editor, {
                increase: !shift
            });
            assertOutput({
                editor,
                expected: renderEditor(t.expected)
            });
        });
    };
    const tests = [
        {
            title: 'single paragraph',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1")), jsx("hli", null, jsx("hp", null, "p2", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "p2", jsx("cursor", null))))))
        },
        {
            title: 'multiple paragraphs',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hp", null, "p2")), jsx("hli", null, jsx("hp", null, "p3", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hp", null, "p2"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "p3", jsx("cursor", null))))))
        },
        {
            title: 'multiple elements',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "a"), jsx("hp", null, "b"), jsx("hquote", null, jsx("hp", null, "quote"))), jsx("hli", null, jsx("hp", null, "c", jsx("cursor", null)), jsx("hp", null, "d"), jsx("hembed", {
                type: "Asset",
                id: "asset-id"
            }))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "a"), jsx("hp", null, "b"), jsx("hquote", null, jsx("hp", null, "quote")), jsx("hul", null, jsx("hli", null, jsx("hp", null, "c", jsx("cursor", null)), jsx("hp", null, "d"), jsx("hembed", {
                type: "Asset",
                id: "asset-id"
            })))))
        },
        {
            title: 'with a sub-list',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "sub p1")))), jsx("hli", null, jsx("hp", null, "p2", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "sub p1")), jsx("hli", null, jsx("hp", null, "p2", jsx("cursor", null))))))
        },
        {
            title: 'with a sub-list as non-last child',
            input: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "sub p1"))), jsx("hembed", {
                type: "Entry",
                id: "entry-id"
            })), jsx("hli", null, jsx("hp", null, "p2", jsx("cursor", null)))),
            expected: jsx("hul", null, jsx("hli", null, jsx("hp", null, "p1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "sub p1")), jsx("hli", null, jsx("hp", null, "p2", jsx("cursor", null)))), jsx("hembed", {
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
