"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testutils = require("../../../test-utils");
describe('normalization', ()=>{
    it('removes empty links from the document structure', ()=>{
        const input = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "link"), (0, _testutils.jsx)("hlink", {
            uri: "https://link.com"
        })), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "asset"), (0, _testutils.jsx)("hlink", {
            asset: "asset-id"
        })), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "entry"), (0, _testutils.jsx)("hlink", {
            entry: "entry-id"
        })), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "resource"), (0, _testutils.jsx)("hlink", {
            resource: "resource-urn"
        })), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "explicit empty link"), (0, _testutils.jsx)("hlink", {
            uri: "https://link.com"
        }, '')), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "link with empty space"), (0, _testutils.jsx)("hlink", {
            uri: "https://link.com"
        }, " ")));
        const expected = (0, _testutils.jsx)("editor", null, (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "link")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "asset")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "entry")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "resource")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "explicit empty link")), (0, _testutils.jsx)("hp", null, (0, _testutils.jsx)("htext", null, "link with empty space")));
        (0, _testutils.assertOutput)({
            input,
            expected
        });
    });
});
