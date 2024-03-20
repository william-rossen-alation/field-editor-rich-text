"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FetchingWrappedEntryCard", {
    enumerable: true,
    get: function() {
        return FetchingWrappedEntryCard;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _f36components = require("@contentful/f36-components");
const _fieldeditorreference = require("@contentful/field-editor-reference");
const _fastdeepequal = _interop_require_default(require("fast-deep-equal"));
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
const InternalEntryCard = _react.memo((props)=>{
    const { entry, sdk, loadEntityScheduledActions } = props;
    if (entry === undefined) {
        return _react.createElement(_f36components.EntryCard, {
            isLoading: true
        });
    }
    if (entry === 'failed') {
        return _react.createElement(_fieldeditorreference.MissingEntityCard, {
            entityType: "Entry",
            isDisabled: props.isDisabled,
            onRemove: props.onRemove
        });
    }
    const contentType = sdk.space.getCachedContentTypes().find((contentType)=>contentType.sys.id === entry.sys.contentType.sys.id);
    return _react.createElement(_fieldeditorreference.WrappedEntryCard, {
        size: "default",
        getAsset: props.sdk.space.getAsset,
        getEntityScheduledActions: loadEntityScheduledActions,
        isSelected: props.isSelected,
        isDisabled: props.isDisabled,
        localeCode: props.locale,
        defaultLocaleCode: props.sdk.locales.default,
        contentType: contentType,
        entry: entry,
        onEdit: props.onEdit,
        onRemove: props.isDisabled ? undefined : props.onRemove,
        isClickable: false
    });
}, _fastdeepequal.default);
InternalEntryCard.displayName = 'ReferenceCard';
const FetchingWrappedEntryCard = (props)=>{
    const { entryId, onEntityFetchComplete } = props;
    const { data: entry, status } = (0, _fieldeditorreference.useEntity)('Entry', entryId);
    const { getEntityScheduledActions } = (0, _fieldeditorreference.useEntityLoader)();
    const loadEntityScheduledActions = _react.useCallback(()=>getEntityScheduledActions('Entry', entryId), [
        getEntityScheduledActions,
        entryId
    ]);
    _react.useEffect(()=>{
        if (status === 'success') {
            onEntityFetchComplete?.();
        }
    }, [
        onEntityFetchComplete,
        status
    ]);
    return _react.createElement(InternalEntryCard, {
        entry: entry,
        sdk: props.sdk,
        locale: props.locale,
        isDisabled: props.isDisabled,
        isSelected: props.isSelected,
        onEdit: props.onEdit,
        onRemove: props.onRemove,
        loadEntityScheduledActions: loadEntityScheduledActions
    });
};
