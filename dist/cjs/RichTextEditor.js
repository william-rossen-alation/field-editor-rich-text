"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}

console.log('exports index file')

_export(exports, {
    ConnectedRichTextEditor: function() {
        return ConnectedRichTextEditor;
    },
    default: function() {
        return _default;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _fieldeditorreference = require("@contentful/field-editor-reference");
const _fieldeditorshared = require("@contentful/field-editor-shared");
const _richtexttypes = _interop_require_wildcard(require("@contentful/rich-text-types"));
const _platecommon = require("@udecode/plate-common");
const _emotion = require("emotion");
const _fastdeepequal = _interop_require_default(require("fast-deep-equal"));
const _noop = _interop_require_default(require("lodash/noop"));
const _ContentfulEditorProvider = require("./ContentfulEditorProvider");
const _toSlateValue = require("./helpers/toSlateValue");
const _misc = require("./internal/misc");
const _plugins = require("./plugins");
const _RichTextEditorstyles = require("./RichTextEditor.styles");
const _SdkProvider = require("./SdkProvider");
const _SyncEditorChanges = require("./SyncEditorChanges");
const _Toolbar = _interop_require_default(require("./Toolbar"));
const _StickyToolbarWrapper = _interop_require_default(require("./Toolbar/components/StickyToolbarWrapper"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const ConnectedRichTextEditor = (props)=>{
    const { sdk, onAction, restrictedMarks } = props;
    const id = (0, _ContentfulEditorProvider.getContentfulEditorId)(sdk);
    const plugins = _react.useMemo(()=>(0, _plugins.getPlugins)(sdk, onAction ?? _noop.default, restrictedMarks), [
        sdk,
        onAction,
        restrictedMarks
    ]);
    const initialValue = _react.useMemo(()=>{
        return (0, _misc.normalizeInitialValue)({
            plugins,
            disableCorePlugins: _plugins.disableCorePlugins
        }, (0, _toSlateValue.toSlateValue)(props.value));
    }, [
        props.value,
        plugins
    ]);
    const classNames = (0, _emotion.cx)(_RichTextEditorstyles.styles.editor, props.minHeight !== undefined ? (0, _emotion.css)({
        minHeight: props.minHeight
    }) : undefined, props.maxHeight !== undefined ? (0, _emotion.css)({
        maxHeight: props.maxHeight
    }) : undefined, props.isDisabled ? _RichTextEditorstyles.styles.disabled : _RichTextEditorstyles.styles.enabled, props.isToolbarHidden && _RichTextEditorstyles.styles.hiddenToolbar);
    return _react.createElement(_SdkProvider.SdkProvider, {
        sdk: sdk
    }, _react.createElement(_ContentfulEditorProvider.ContentfulEditorIdProvider, {
        value: id
    }, _react.createElement("div", {
        className: _RichTextEditorstyles.styles.root,
        "data-test-id": "rich-text-editor"
    }, _react.createElement(_platecommon.Plate, {
        id: id,
        initialValue: initialValue,
        plugins: plugins,
        disableCorePlugins: _plugins.disableCorePlugins
    }, !props.isToolbarHidden && _react.createElement(_StickyToolbarWrapper.default, {
        isDisabled: props.isDisabled
    }, _react.createElement(_Toolbar.default, {
        isDisabled: props.isDisabled
    })), _react.createElement(_SyncEditorChanges.SyncEditorChanges, {
        incomingValue: initialValue,
        onChange: props.onChange
    }), _react.createElement(_platecommon.PlateContent, {
        id: id,
        className: classNames,
        readOnly: props.isDisabled
    })))));
};
const RichTextEditor = (props)=>{
    const { sdk, isInitiallyDisabled, onAction, restrictedMarks, ...otherProps } = props;
    const isEmptyValue = _react.useCallback((value)=>!value || (0, _fastdeepequal.default)(value, _richtexttypes.EMPTY_DOCUMENT), []);
    const id = (0, _ContentfulEditorProvider.getContentfulEditorId)(props.sdk);
    return _react.createElement(_fieldeditorreference.EntityProvider, {
        sdk: sdk
    }, _react.createElement(_fieldeditorshared.FieldConnector, {
        debounce: 0,
        field: sdk.field,
        isInitiallyDisabled: isInitiallyDisabled,
        isEmptyValue: isEmptyValue,
        isEqualValues: _fastdeepequal.default
    }, ({ lastRemoteValue, disabled, setValue })=>_react.createElement(ConnectedRichTextEditor, {
            ...otherProps,
            key: `rich-text-editor-${id}`,
            value: lastRemoteValue,
            sdk: sdk,
            onAction: onAction,
            isDisabled: disabled,
            onChange: setValue,
            restrictedMarks: restrictedMarks
        })));
};
const _default = RichTextEditor;
