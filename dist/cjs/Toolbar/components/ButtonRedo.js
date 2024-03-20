"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ButtonRedo", {
    enumerable: true,
    get: function() {
        return ButtonRedo;
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
const ButtonRedo = ()=>{
    const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
    return _react.default.createElement(_ToolbarButton.ToolbarButton, {
        title: "Redo",
        testId: "redo-toolbar-button",
        onClick: editor.redo,
        isActive: false,
        isDisabled: editor.history.redos.length === 0
    }, _react.default.createElement(_f36components.Icon, {
        variant: "secondary"
    }, _react.default.createElement("path", {
        d: "M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"
    })));
};
