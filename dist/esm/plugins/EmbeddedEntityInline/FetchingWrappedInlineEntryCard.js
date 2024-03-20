import * as React from 'react';
import { InlineEntryCard, MenuItem, Text } from '@contentful/f36-components';
import { ClockIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { ScheduledIconWithTooltip, useEntity, useEntityLoader } from '@contentful/field-editor-reference';
import { entityHelpers } from '@contentful/field-editor-shared';
import { INLINES } from '@contentful/rich-text-types';
import { css } from 'emotion';
const { getEntryTitle, getEntryStatus } = entityHelpers;
const styles = {
    scheduledIcon: css({
        verticalAlign: 'text-bottom',
        marginRight: tokens.spacing2Xs
    })
};
export function FetchingWrappedInlineEntryCard(props) {
    const { data: entry, status: requestStatus } = useEntity('Entry', props.entryId);
    const { getEntityScheduledActions } = useEntityLoader();
    const loadEntityScheduledActions = ()=>getEntityScheduledActions('Entry', props.entryId);
    const allContentTypes = props.sdk.space.getCachedContentTypes();
    const { onEntityFetchComplete } = props;
    const contentType = React.useMemo(()=>{
        if (!entry || !allContentTypes) return undefined;
        return allContentTypes.find((contentType)=>contentType.sys.id === entry.sys.contentType.sys.id);
    }, [
        allContentTypes,
        entry
    ]);
    React.useEffect(()=>{
        if (requestStatus !== 'success') {
            return;
        }
        onEntityFetchComplete?.();
    }, [
        requestStatus,
        onEntityFetchComplete
    ]);
    const contentTypeName = contentType ? contentType.name : '';
    const title = React.useMemo(()=>getEntryTitle({
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
        return React.createElement(InlineEntryCard, {
            title: "Entry missing or inaccessible",
            testId: INLINES.EMBEDDED_ENTRY,
            isSelected: props.isSelected
        });
    }
    if (requestStatus === 'loading') {
        return React.createElement(InlineEntryCard, {
            isLoading: true
        });
    }
    const entryStatus = getEntryStatus(entry.sys);
    if (entryStatus === 'deleted') {
        return React.createElement(InlineEntryCard, {
            title: "Entry missing or inaccessible",
            testId: INLINES.EMBEDDED_ENTRY,
            isSelected: props.isSelected,
            actions: [
                React.createElement(MenuItem, {
                    key: "remove",
                    onClick: props.onRemove,
                    testId: "delete"
                }, "Remove")
            ]
        });
    }
    return React.createElement(InlineEntryCard, {
        testId: INLINES.EMBEDDED_ENTRY,
        isSelected: props.isSelected,
        title: `${contentTypeName}: ${title}`,
        status: entryStatus,
        actions: [
            React.createElement(MenuItem, {
                key: "edit",
                onClick: props.onEdit
            }, "Edit"),
            React.createElement(MenuItem, {
                key: "remove",
                onClick: props.onRemove,
                disabled: props.isDisabled,
                testId: "delete"
            }, "Remove")
        ]
    }, React.createElement(ScheduledIconWithTooltip, {
        getEntityScheduledActions: loadEntityScheduledActions,
        entityType: "Entry",
        entityId: entry.sys.id
    }, React.createElement(ClockIcon, {
        className: styles.scheduledIcon,
        variant: "muted",
        testId: "scheduled-icon"
    })), React.createElement(Text, null, title));
}
