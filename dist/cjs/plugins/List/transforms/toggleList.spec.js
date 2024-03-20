"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _richtexttypes = require("@contentful/rich-text-types");
const _testutils = require("../../../test-utils");
const _toggleList = require("./toggleList");
describe('toggle on', ()=>{
    it('should turn a p to list', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, "1", (0, _testutils.jsx)("cursor", null)));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1", (0, _testutils.jsx)("cursor", null)))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.UL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
    it('should turn a p with a selection to list', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, "Planetas ", (0, _testutils.jsx)("anchor", null), "mori in", (0, _testutils.jsx)("focus", null), " gandavum!"));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "Planetas ", (0, _testutils.jsx)("anchor", null), "mori in", (0, _testutils.jsx)("focus", null), " gandavum!"))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.UL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
    it('should turn multiple p to list', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("anchor", null), "1"), (0, _testutils.jsx)("hp", null, "2"), (0, _testutils.jsx)("hp", null, "3", (0, _testutils.jsx)("focus", null)));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("anchor", null), "1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "2")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "3", (0, _testutils.jsx)("focus", null)))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.UL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
});
describe('toggle off', ()=>{
    it('should split a simple list to two', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "2", (0, _testutils.jsx)("cursor", null))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "3"))));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1"))), (0, _testutils.jsx)("hp", null, "2", (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "3"))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.UL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
    it('should split a nested list', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "11")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "12", (0, _testutils.jsx)("cursor", null))), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "13"))))));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "11"))))), (0, _testutils.jsx)("hp", null, "12", (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "13"))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.UL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
    it('should turn a list to multiple p', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("anchor", null), "1")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "2")), (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "3", (0, _testutils.jsx)("focus", null)))));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("anchor", null), "1"), (0, _testutils.jsx)("hp", null, "2"), (0, _testutils.jsx)("hp", null, "3", (0, _testutils.jsx)("focus", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.UL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
});
describe('toggle over', ()=>{
    it('should toggle different list types', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1", (0, _testutils.jsx)("cursor", null)))));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hol", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1"))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.OL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
    it('should only toggle the nested list', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "11", (0, _testutils.jsx)("cursor", null)))))));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "1"), (0, _testutils.jsx)("hol", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "11", (0, _testutils.jsx)("cursor", null)))))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.OL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
    it('should only toggle everything that is selected', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("anchor", null), "1"), (0, _testutils.jsx)("hul", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "11", (0, _testutils.jsx)("focus", null)))))));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hol", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("anchor", null), "1"), (0, _testutils.jsx)("hol", null, (0, _testutils.jsx)("hli", null, (0, _testutils.jsx)("hp", null, "11", (0, _testutils.jsx)("focus", null)))))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
        const { editor } = (0, _testutils.createTestEditor)({
            input
        });
        (0, _toggleList.toggleList)(editor, {
            type: _richtexttypes.BLOCKS.OL_LIST
        });
        (0, _testutils.assertOutput)({
            editor,
            expected
        });
    });
});
