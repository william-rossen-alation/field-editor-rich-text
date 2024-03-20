import * as React from 'react';
import { TextLink } from '@contentful/f36-components';
import { handleCopyLink, handleEditLink, handleRemoveLink } from './linkHandlers';
import { LinkPopover } from './LinkPopover';
import { styles } from './styles';
import { useHyperlinkCommon } from './useHyperlinkCommon';
export function UrlHyperlink(props) {
    const { editor, sdk, isLinkFocused, pathToElement, isEditorFocused } = useHyperlinkCommon(props.element);
    const uri = props.element.data?.uri;
    const popoverText = React.createElement(TextLink, {
        className: styles.openLink,
        href: uri,
        rel: "noopener noreferrer",
        target: "_blank"
    }, uri);
    return React.createElement(LinkPopover, {
        isLinkFocused: isLinkFocused,
        handleEditLink: ()=>handleEditLink(editor, sdk, pathToElement),
        handleRemoveLink: ()=>handleRemoveLink(editor),
        handleCopyLink: ()=>handleCopyLink(uri),
        popoverText: popoverText,
        isEditorFocused: isEditorFocused
    }, React.createElement(TextLink, {
        testId: "cf-ui-text-link",
        href: uri,
        onClick: (e)=>e.preventDefault(),
        className: styles.hyperlink
    }, props.children));
}
