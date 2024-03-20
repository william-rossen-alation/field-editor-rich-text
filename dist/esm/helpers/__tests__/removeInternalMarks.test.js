import { toContentfulDocument } from '@contentful/contentful-slatejs-adapter';
import { COMMAND_PROMPT } from '../../plugins/CommandPalette/constants';
import { jsx } from '../../test-utils';
import { removeInternalMarks } from '../removeInternalMarks';
describe('internal mark', ()=>{
    describe('First level nodes', ()=>{
        const data = [
            {
                title: 'Paragraph mark is removed',
                input: toContentfulDocument({
                    document: jsx("editor", null, jsx("hp", null, jsx("htext", {
                        [COMMAND_PROMPT]: true
                    }))).children
                }),
                expected: toContentfulDocument({
                    document: jsx("editor", null, jsx("hp", null, jsx("htext", null))).children
                })
            },
            {
                title: 'Heading mark is removed',
                input: toContentfulDocument({
                    document: jsx("editor", null, jsx("hh1", null, jsx("htext", {
                        [COMMAND_PROMPT]: true
                    }))).children
                }),
                expected: toContentfulDocument({
                    document: jsx("editor", null, jsx("hh1", null, jsx("htext", null))).children
                })
            },
            {
                title: 'Block quote mark is removed',
                input: toContentfulDocument({
                    document: jsx("editor", null, jsx("hquote", null, jsx("hp", null, jsx("htext", {
                        [COMMAND_PROMPT]: true
                    })))).children
                }),
                expected: toContentfulDocument({
                    document: jsx("editor", null, jsx("hquote", null, jsx("hp", null, jsx("htext", null)))).children
                })
            },
            {
                title: 'Other marks are not removed',
                input: toContentfulDocument({
                    document: jsx("editor", null, jsx("hquote", null, jsx("hp", null, jsx("htext", {
                        bold: true,
                        underline: true,
                        [COMMAND_PROMPT]: true
                    })))).children
                }),
                expected: toContentfulDocument({
                    document: jsx("editor", null, jsx("hquote", null, jsx("hp", null, jsx("htext", {
                        bold: true,
                        underline: true
                    })))).children
                })
            }
        ];
        for (const { input, expected, title } of data){
            it(`${title}`, ()=>{
                expect(removeInternalMarks(input)).toEqual(expected);
            });
        }
    });
});
