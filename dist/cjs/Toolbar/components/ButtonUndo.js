"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ButtonUndo", {
    enumerable: true,
    get: function() {
        return ButtonUndo;
    }
});
const _react = _interop_require_default(require("react"));
const _f36components = require("@contentful/f36-components");
const _ContentfulEditorProvider = require("../../ContentfulEditorProvider");
const _ToolbarButton = require("../../plugins/shared/ToolbarButton");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ButtonUndo = ()=>{
    const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
    return _react.default.createElement(_ToolbarButton.ToolbarButton, {
        title: "Undo",
        testId: "undo-toolbar-button",
        onClick: editor.undo,
        isActive: false,
        isDisabled: editor.history.undos.length === 0
    }, _react.default.createElement(_f36components.Icon, {
        variant: "secondary"
    }, _react.default.createElement("path", {
        d: "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"
    })));
};
