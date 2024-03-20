import { jsx, assertOutput, createTestEditor } from '../../../test-utils';
import { insertTableAndFocusFirstCell } from '../helpers';
test('insertTableAndFocusFirstCell', ()=>{
    const input = jsx("editor", null, jsx("hp", null, jsx("htext", null), jsx("cursor", null)), jsx("hp", null));
    const { editor } = createTestEditor({
        input
    });
    insertTableAndFocusFirstCell(editor);
    const expected = jsx("editor", null, jsx("htable", null, jsx("htr", null, jsx("hth", null, jsx("hp", null, jsx("htext", null), jsx("cursor", null))), jsx("hth", null, jsx("hp", null, jsx("htext", null)))), jsx("htr", null, jsx("htd", null, jsx("hp", null, jsx("htext", null))), jsx("htd", null, jsx("hp", null, jsx("htext", null))))), jsx("hp", null, jsx("htext", null)));
    assertOutput({
        input,
        expected
    });
});
