"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FetchingWrappedInlineEntryCard", {
    enumerable: true,
    get: function() {
        return FetchingWrappedInlineEntryCard;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _f36components = require("@contentful/f36-components");
const _f36icons = require("@contentful/f36-icons");
const _f36tokens = _interop_require_default(require("@contentful/f36-tokens"));
const _fieldeditorreference = require("@contentful/field-editor-reference");
const _fieldeditorshared = require("@contentful/field-editor-shared");
const _richtexttypes = require("@contentful/rich-text-types");
const _emotion = require("emotion");
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
const { getEntryTitle, getEntryStatus } = _fieldeditorshared.entityHelpers;
const styles = {
    scheduledIcon: (0, _emotion.css)({
        verticalAlign: 'text-bottom',
        marginRight: _f36tokens.default.spacing2Xs
    })
};
function FetchingWrappedInlineEntryCard(props) {
    const { data: entry, status: requestStatus } = (0, _fieldeditorreference.useEntity)('Entry', props.entryId);
    const { getEntityScheduledActions } = (0, _fieldeditorreference.useEntityLoader)();
    const loadEntityScheduledActions = ()=>getEntityScheduledActions('Entry', props.entryId);
    const allContentTypes = props.sdk.space.getCachedContentTypes();
    const { onEntityFetchComplete } = props;
    const contentType = _react.useMemo(()=>{
        if (!entry || !allContentTypes) return undefined;
        return allContentTypes.find((contentType)=>contentType.sys.id === entry.sys.contentType.sys.id);
    }, [
        allContentTypes,
        entry
    ]);
    _react.useEffect(()=>{
        if (requestStatus !== 'success') {
            return;
        }
        onEntityFetchComplete?.();
    }, [
        requestStatus,
        onEntityFetchComplete
    ]);
    const contentTypeName = contentType ? contentType.name : '';
    const title = _react.useMemo(()=>getEntryTitle({
            entry,
            contentType,
            localeCode: props.sdk.field.locale,
            defaultLocaleCode: props.sdk.locales.default,
            defaultTitle: 'Untitled'
        }), [
        entry,
        contentType,
        props.sdk.field.locale,
        props.sdk.locales.default
    ]);
    if (requestStatus === 'error') {
        return _react.createElement(_f36components.InlineEntryCard, {
            title: "Entry missing or inaccessible",
            testId: _richtexttypes.INLINES.EMBEDDED_ENTRY,
            isSelected: props.isSelected
        });
    }
    if (requestStatus === 'loading') {
        return _react.createElement(_f36components.InlineEntryCard, {
            isLoading: true
        });
    }
    const entryStatus = getEntryStatus(entry.sys);
    if (entryStatus === 'deleted') {
        return _react.createElement(_f36components.InlineEntryCard, {
            title: "Entry missing or inaccessible",
            testId: _richtexttypes.INLINES.EMBEDDED_ENTRY,
            isSelected: props.isSelected,
            actions: [
                _react.createElement(_f36components.MenuItem, {
                    key: "remove",
                    onClick: props.onRemove,
                    testId: "delete"
                }, "Remove")
            ]
        });
    }
    return _react.createElement(_f36components.InlineEntryCard, {
        testId: _richtexttypes.INLINES.EMBEDDED_ENTRY,
        isSelected: props.isSelected,
        title: `${contentTypeName}: ${title}`,
        status: entryStatus,
        actions: [
            _react.createElement(_f36components.MenuItem, {
                key: "edit",
                onClick: props.onEdit
            }, "Edit"),
            _react.createElement(_f36components.MenuItem, {
                key: "remove",
                onClick: props.onRemove,
                disabled: props.isDisabled,
                testId: "delete"
            }, "Remove")
        ]
    }, _react.createElement(_fieldeditorreference.ScheduledIconWithTooltip, {
        getEntityScheduledActions: loadEntityScheduledActions,
        entityType: "Entry",
        entityId: entry.sys.id
    }, _react.createElement(_f36icons.ClockIcon, {
        className: styles.scheduledIcon,
        variant: "muted",
        testId: "scheduled-icon"
    })), _react.createElement(_f36components.Text, null, title));
}
