import { assertOutput, jsx } from '../../../test-utils';
describe('normalization', ()=>{
    it('removes empty links from the document structure', ()=>{
        const input = jsx("editor", null, jsx("hp", null, jsx("htext", null, "link"), jsx("hlink", {
            uri: "https://link.com"
        })), jsx("hp", null, jsx("htext", null, "asset"), jsx("hlink", {
            asset: "asset-id"
        })), jsx("hp", null, jsx("htext", null, "entry"), jsx("hlink", {
            entry: "entry-id"
        })), jsx("hp", null, jsx("htext", null, "resource"), jsx("hlink", {
            resource: "resource-urn"
        })), jsx("hp", null, jsx("htext", null, "explicit empty link"), jsx("hlink", {
            uri: "https://link.com"
        }, '')), jsx("hp", null, jsx("htext", null, "link with empty space"), jsx("hlink", {
            uri: "https://link.com"
        }, " ")));
        const expected = jsx("editor", null, jsx("hp", null, jsx("htext", null, "link")), jsx("hp", null, jsx("htext", null, "asset")), jsx("hp", null, jsx("htext", null, "entry")), jsx("hp", null, jsx("htext", null, "resource")), jsx("hp", null, jsx("htext", null, "explicit empty link")), jsx("hp", null, jsx("htext", null, "link with empty space")));
        assertOutput({
            input,
            expected
        });
    });
});
