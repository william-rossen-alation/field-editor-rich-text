import * as React from 'react';
import { AssetCard } from '@contentful/f36-components';
import { useEntity, useEntityLoader, MissingEntityCard, WrappedAssetCard } from '@contentful/field-editor-reference';
import areEqual from 'fast-deep-equal';
const InternalAssetCard = React.memo((props)=>{
    if (props.asset === undefined) {
        return React.createElement(AssetCard, {
            size: "default",
            isLoading: true
        });
    }
    if (props.asset === 'failed') {
        return React.createElement(MissingEntityCard, {
            entityType: "Asset",
            isDisabled: props.isDisabled,
            onRemove: props.onRemove
        });
    }
    return React.createElement(WrappedAssetCard, {
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
}, areEqual);
InternalAssetCard.displayName = 'InternalAssetCard';
export function FetchingWrappedAssetCard(props) {
    const { onEntityFetchComplete } = props;
    const { data: asset, status } = useEntity('Asset', props.assetId);
    const { getEntityScheduledActions } = useEntityLoader();
    const loadEntityScheduledActions = React.useCallback(()=>getEntityScheduledActions('Asset', props.assetId), [
        getEntityScheduledActions,
        props.assetId
    ]);
    React.useEffect(()=>{
        if (status === 'success') {
            onEntityFetchComplete?.();
        }
    }, [
        onEntityFetchComplete,
        status
    ]);
    return React.createElement(InternalAssetCard, {
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
