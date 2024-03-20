import * as React from 'react';
import { Menu, Flex } from '@contentful/f36-components';
import { EmbeddedEntryInlineIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { INLINES } from '@contentful/rich-text-types';
import { css } from 'emotion';
import { useContentfulEditor } from '../../ContentfulEditorProvider';
import { moveToTheNextChar } from '../../helpers/editor';
import { useSdkContext } from '../../SdkProvider';
import { selectEntityAndInsert, selectResourceEntityAndInsert } from '../shared/EmbeddedInlineUtil';
import { ResourceNewBadge } from './ResourceNewBadge';
const styles = {
    icon: css({
        marginRight: '10px'
    }),
    root: css({
        display: 'inline-block',
        margin: `0 ${tokens.spacing2Xs}`,
        fontSize: 'inherit',
        span: {
            userSelect: 'none'
        }
    })
};
export function EmbeddedInlineToolbarIcon({ onClose, nodeType, isDisabled }) {
    const editor = useContentfulEditor();
    const sdk = useSdkContext();
    async function handleClick(event) {
        event.preventDefault();
        if (!editor) return;
        onClose();
        if (nodeType === INLINES.EMBEDDED_RESOURCE) {
            await selectResourceEntityAndInsert(editor, sdk, editor.tracking.onToolbarAction);
        } else {
            await selectEntityAndInsert(editor, sdk, editor.tracking.onToolbarAction);
        }
        moveToTheNextChar(editor);
    }
    return React.createElement(Menu.Item, {
        disabled: isDisabled,
        className: "rich-text__entry-link-block-button",
        testId: `toolbar-toggle-${nodeType}`,
        onClick: handleClick
    }, React.createElement(Flex, {
        alignItems: "center",
        flexDirection: "row"
    }, React.createElement(EmbeddedEntryInlineIcon, {
        variant: "secondary",
        className: `rich-text__embedded-entry-list-icon ${styles.icon}`
    }), React.createElement("span", null, "Inline entry", nodeType == INLINES.EMBEDDED_RESOURCE && React.createElement(ResourceNewBadge, null))));
}
