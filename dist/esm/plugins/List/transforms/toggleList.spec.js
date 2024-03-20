import { BLOCKS } from '@contentful/rich-text-types';
import { assertOutput, jsx, createTestEditor } from '../../../test-utils';
import { toggleList } from './toggleList';
describe('toggle on', ()=>{
    it('should turn a p to list', ()=>{
        const input = jsx("editor", null, jsx("hp", null, "1", jsx("cursor", null)));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1", jsx("cursor", null)))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.UL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
    it('should turn a p with a selection to list', ()=>{
        const input = jsx("editor", null, jsx("hp", null, "Planetas ", jsx("anchor", null), "mori in", jsx("focus", null), " gandavum!"));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "Planetas ", jsx("anchor", null), "mori in", jsx("focus", null), " gandavum!"))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.UL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
    it('should turn multiple p to list', ()=>{
        const input = jsx("editor", null, jsx("hp", null, jsx("anchor", null), "1"), jsx("hp", null, "2"), jsx("hp", null, "3", jsx("focus", null)));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("anchor", null), "1")), jsx("hli", null, jsx("hp", null, "2")), jsx("hli", null, jsx("hp", null, "3", jsx("focus", null)))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.UL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
});
describe('toggle off', ()=>{
    it('should split a simple list to two', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1")), jsx("hli", null, jsx("hp", null, "2", jsx("cursor", null))), jsx("hli", null, jsx("hp", null, "3"))));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1"))), jsx("hp", null, "2", jsx("cursor", null)), jsx("hul", null, jsx("hli", null, jsx("hp", null, "3"))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.UL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
    it('should split a nested list', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "11")), jsx("hli", null, jsx("hp", null, "12", jsx("cursor", null))), jsx("hli", null, jsx("hp", null, "13"))))));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "11"))))), jsx("hp", null, "12", jsx("cursor", null)), jsx("hul", null, jsx("hli", null, jsx("hp", null, "13"))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.UL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
    it('should turn a list to multiple p', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("anchor", null), "1")), jsx("hli", null, jsx("hp", null, "2")), jsx("hli", null, jsx("hp", null, "3", jsx("focus", null)))));
        const expected = jsx("editor", null, jsx("hp", null, jsx("anchor", null), "1"), jsx("hp", null, "2"), jsx("hp", null, "3", jsx("focus", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.UL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
});
describe('toggle over', ()=>{
    it('should toggle different list types', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1", jsx("cursor", null)))));
        const expected = jsx("editor", null, jsx("hol", null, jsx("hli", null, jsx("hp", null, "1"))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.OL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
    it('should only toggle the nested list', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "11", jsx("cursor", null)))))));
        const expected = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, "1"), jsx("hol", null, jsx("hli", null, jsx("hp", null, "11", jsx("cursor", null)))))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.OL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
    it('should only toggle everything that is selected', ()=>{
        const input = jsx("editor", null, jsx("hul", null, jsx("hli", null, jsx("hp", null, jsx("anchor", null), "1"), jsx("hul", null, jsx("hli", null, jsx("hp", null, "11", jsx("focus", null)))))));
        const expected = jsx("editor", null, jsx("hol", null, jsx("hli", null, jsx("hp", null, jsx("anchor", null), "1"), jsx("hol", null, jsx("hli", null, jsx("hp", null, "11", jsx("focus", null)))))), jsx("hp", null, jsx("htext", null)));
        const { editor } = createTestEditor({
            input
        });
        toggleList(editor, {
            type: BLOCKS.OL_LIST
        });
        assertOutput({
            editor,
            expected
        });
    });
});
