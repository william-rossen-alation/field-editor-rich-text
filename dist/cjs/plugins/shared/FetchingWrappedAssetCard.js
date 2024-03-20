"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FetchingWrappedAssetCard", {
    enumerable: true,
    get: function() {
        return FetchingWrappedAssetCard;
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
const InternalAssetCard = _react.memo((props)=>{
    if (props.asset === undefined) {
        return _react.createElement(_f36components.AssetCard, {
            size: "default",
            isLoading: true
        });
    }
    if (props.asset === 'failed') {
        return _react.createElement(_fieldeditorreference.MissingEntityCard, {
            entityType: "Asset",
            isDisabled: props.isDisabled,
            onRemove: props.onRemove
        });
    }
    return _react.createElement(_fieldeditorreference.WrappedAssetCard, {
        getEntityScheduledActions: props.loadEntityScheduledActions,
        size: "small",
        isSelected: props.isSelected,
        isDisabled: props.isDisabled,
        localeCode: props.locale,
        defaultLocaleCode: props.sdk.locales.default,
        asset: props.asset,
        onEdit: props.onEdit,
        onRemove: props.isDisabled ? undefined : props.onRemove,
        isClickable: false
    });
}, _fastdeepequal.default);
InternalAssetCard.displayName = 'InternalAssetCard';
function FetchingWrappedAssetCard(props) {
    const { onEntityFetchComplete } = props;
    const { data: asset, status } = (0, _fieldeditorreference.useEntity)('Asset', props.assetId);
    const { getEntityScheduledActions } = (0, _fieldeditorreference.useEntityLoader)();
    const loadEntityScheduledActions = _react.useCallback(()=>getEntityScheduledActions('Asset', props.assetId), [
        getEntityScheduledActions,
        props.assetId
    ]);
    _react.useEffect(()=>{
        if (status === 'success') {
            onEntityFetchComplete?.();
        }
    }, [
        onEntityFetchComplete,
        status
    ]);
    return _react.createElement(InternalAssetCard, {
        asset: asset,
        sdk: props.sdk,
        isDisabled: props.isDisabled,
        isSelected: props.isSelected,
        loadEntityScheduledActions: loadEntityScheduledActions,
        locale: props.locale,
        onEdit: props.onEdit,
        onRemove: props.onRemove
    });
}
