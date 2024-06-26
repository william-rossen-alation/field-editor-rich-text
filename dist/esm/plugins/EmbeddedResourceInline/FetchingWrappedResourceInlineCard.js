import * as React from 'react';
import { InlineEntryCard, MenuItem, Text } from '@contentful/f36-components';
import { useResource } from '@contentful/field-editor-reference';
import { entityHelpers } from '@contentful/field-editor-shared';
import { INLINES } from '@contentful/rich-text-types';
import { truncateTitle } from '../../plugins/shared/utils';
const { getEntryTitle, getEntryStatus } = entityHelpers;
export function FetchingWrappedResourceInlineCard(props) {
    const { link, onEntityFetchComplete } = props;
    const { data, status: requestStatus } = useResource(link.linkType, link.urn);
    React.useEffect(()=>{
        if (requestStatus === 'success') {
            onEntityFetchComplete?.();
        }
    }, [
        onEntityFetchComplete,
        requestStatus
    ]);
    if (requestStatus === 'error') {
        return React.createElement(InlineEntryCard, {
            title: "Entry missing or inaccessible",
            testId: INLINES.EMBEDDED_RESOURCE,
            isSelected: props.isSelected
        });
    }
    if (requestStatus === 'loading' || data === undefined) {
        return React.createElement(InlineEntryCard, {
            isLoading: true
        });
    }
    const { resource: entry, contentType, defaultLocaleCode, space } = data;
    const title = getEntryTitle({
        entry,
        contentType,
        defaultLocaleCode,
        localeCode: defaultLocaleCode,
        defaultTitle: 'Untitled'
    });
    const truncatedTitle = truncateTitle(title, 40);
    const status = getEntryStatus(entry.sys);
    return React.createElement(InlineEntryCard, {
        testId: INLINES.EMBEDDED_RESOURCE,
        isSelected: props.isSelected,
        title: `${contentType.name}: ${truncatedTitle} (Space: ${space.name} – Env.: ${entry.sys.environment.sys.id})`,
        status: status,
        actions: [
            React.createElement(MenuItem, {
                key: "remove",
                onClick: props.onRemove,
                disabled: props.isDisabled,
                testId: "delete"
            }, "Remove")
        ]
    }, React.createElement(Text, null, title));
}
