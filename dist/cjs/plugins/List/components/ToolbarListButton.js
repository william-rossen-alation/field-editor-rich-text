"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ToolbarListButton", {
    enumerable: true,
    get: function() {
        return ToolbarListButton;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _f36icons = require("@contentful/f36-icons");
const _richtexttypes = require("@contentful/rich-text-types");
const _ContentfulEditorProvider = require("../../../ContentfulEditorProvider");
const _editor = require("../../../helpers/editor");
const _validations = require("../../../helpers/validations");
const _SdkProvider = require("../../../SdkProvider");
const _ToolbarButton = require("../../shared/ToolbarButton");
const _toggleList = require("../transforms/toggleList");
const _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function ToolbarListButton(props) {
    const sdk = (0, _SdkProvider.useSdkContext)();
    const editor = (0, _ContentfulEditorProvider.useContentfulEditor)();
    function handleClick(type) {
        return ()=>{
            if (!editor?.selection) return;
            (0, _toggleList.toggleList)(editor, {
                type
            });
            (0, _editor.focus)(editor);
        };
    }
    if (!editor) return null;
    return _react.createElement(_react.Fragment, null, (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.UL_LIST) && _react.createElement(_ToolbarButton.ToolbarButton, {
        title: "UL",
        testId: "ul-toolbar-button",
        onClick: handleClick(_richtexttypes.BLOCKS.UL_LIST),
        isActive: (0, _utils.isListTypeActive)(editor, _richtexttypes.BLOCKS.UL_LIST),
        isDisabled: props.isDisabled
    }, _react.createElement(_f36icons.ListBulletedIcon, null)), (0, _validations.isNodeTypeEnabled)(sdk.field, _richtexttypes.BLOCKS.OL_LIST) && _react.createElement(_ToolbarButton.ToolbarButton, {
        title: "OL",
        testId: "ol-toolbar-button",
        onClick: handleClick(_richtexttypes.BLOCKS.OL_LIST),
        isActive: (0, _utils.isListTypeActive)(editor, _richtexttypes.BLOCKS.OL_LIST),
        isDisabled: props.isDisabled
    }, _react.createElement(_f36icons.ListNumberedIcon, null)));
}
