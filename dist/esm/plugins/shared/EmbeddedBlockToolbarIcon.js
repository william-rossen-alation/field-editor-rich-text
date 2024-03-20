import * as React from 'react';
import { Flex, Icon, Menu } from '@contentful/f36-components';
import { AssetIcon, EmbeddedEntryBlockIcon } from '@contentful/f36-icons';
import { BLOCKS } from '@contentful/rich-text-types';
import { css } from 'emotion';
import { useContentfulEditor } from '../../ContentfulEditorProvider';
import { useSdkContext } from '../../SdkProvider';
import { selectEntityAndInsert, selectResourceEntityAndInsert } from '../shared/EmbeddedBlockUtil';
import { ResourceNewBadge } from './ResourceNewBadge';
export const styles = {
    icon: css({
        marginRight: '10px'
    })
};
export function EmbeddedBlockToolbarIcon({ isDisabled, nodeType, onClose }) {
    const editor = useContentfulEditor();
    const sdk = useSdkContext();
    const handleClick = async (event)=>{
        event.preventDefault();
        if (!editor) {
            return;
        }
        onClose();
        if (nodeType == BLOCKS.EMBEDDED_RESOURCE) {
            await selectResourceEntityAndInsert(sdk, editor, editor.tracking.onToolbarAction);
        } else {
            await selectEntityAndInsert(nodeType, sdk, editor, editor.tracking.onToolbarAction);
        }
    };
    const type = getEntityTypeFromNodeType(nodeType);
    const baseClass = `rich-text__${nodeType}`;
    return React.createElement(Menu.Item, {
        disabled: isDisabled,
        className: `${baseClass}-list-item`,
        onClick: handleClick,
        testId: `toolbar-toggle-${nodeType}`
    }, React.createElement(Flex, {
        alignItems: "center",
        flexDirection: "row"
    }, React.createElement(Icon, {
        as: type === 'Asset' ? AssetIcon : EmbeddedEntryBlockIcon,
        className: `rich-text__embedded-entry-list-icon ${styles.icon}`,
        variant: "secondary"
    }), React.createElement("span", null, type, nodeType == BLOCKS.EMBEDDED_RESOURCE && React.createElement(ResourceNewBadge, null))));
}
function getEntityTypeFromNodeType(nodeType) {
    const words = nodeType.toLowerCase().split('-');
    if (words.includes('entry') || words.includes('resource')) {
        return 'Entry';
    }
    if (words.includes('asset')) {
        return 'Asset';
    }
    throw new Error(`Node type \`${nodeType}\` has no associated \`entityType\``);
}
