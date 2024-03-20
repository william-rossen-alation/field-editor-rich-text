"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
const _helpers = require("../helpers");
test('insertTableAndFocusFirstCell', ()=>{
    const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null), (0, _testutils.jsx)("cursor", null)), (0, _testutils.jsx)("hp", null));
    const { editor } = (0, _testutils.createTestEditor)({
        input
    });
    (0, _helpers.insertTableAndFocusFirstCell)(editor);
    const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("htable", null, (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("hth", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null), (0, _testutils.jsx)("cursor", null))), (0, _testutils.jsx)("hth", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)))), (0, _testutils.jsx)("htr", null, (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null))), (0, _testutils.jsx)("htd", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null))))), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null)));
    (0, _testutils.assertOutput)({
        input,
        expected
    });
});
