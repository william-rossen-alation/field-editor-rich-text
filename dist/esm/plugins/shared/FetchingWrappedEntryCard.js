import * as React from 'react';
import { EntryCard } from '@contentful/f36-components';
import { useEntity, MissingEntityCard, WrappedEntryCard, useEntityLoader } from '@contentful/field-editor-reference';
import areEqual from 'fast-deep-equal';
const InternalEntryCard = React.memo((props)=>{
    const { entry, sdk, loadEntityScheduledActions } = props;
    if (entry === undefined) {
        return React.createElement(EntryCard, {
            isLoading: true
        });
    }
    if (entry === 'failed') {
        return React.createElement(MissingEntityCard, {
            entityType: "Entry",
            isDisabled: props.isDisabled,
            onRemove: props.onRemove
        });
    }
    const contentType = sdk.space.getCachedContentTypes().find((contentType)=>contentType.sys.id === entry.sys.contentType.sys.id);
    return React.createElement(WrappedEntryCard, {
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
}, areEqual);
InternalEntryCard.displayName = 'ReferenceCard';
export const FetchingWrappedEntryCard = (props)=>{
    const { entryId, onEntityFetchComplete } = props;
    const { data: entry, status } = useEntity('Entry', entryId);
    const { getEntityScheduledActions } = useEntityLoader();
    const loadEntityScheduledActions = React.useCallback(()=>getEntityScheduledActions('Entry', entryId), [
        getEntityScheduledActions,
        entryId
    ]);
    React.useEffect(()=>{
        if (status === 'success') {
            onEntityFetchComplete?.();
        }
    }, [
        onEntityFetchComplete,
        status
    ]);
    return React.createElement(InternalEntryCard, {
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
