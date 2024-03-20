import * as React from 'react';
import { ListBulletedIcon, ListNumberedIcon } from '@contentful/f36-icons';
import { BLOCKS } from '@contentful/rich-text-types';
import { useContentfulEditor } from '../../../ContentfulEditorProvider';
import { focus } from '../../../helpers/editor';
import { isNodeTypeEnabled } from '../../../helpers/validations';
import { useSdkContext } from '../../../SdkProvider';
import { ToolbarButton } from '../../shared/ToolbarButton';
import { toggleList } from '../transforms/toggleList';
import { isListTypeActive } from '../utils';
export function ToolbarListButton(props) {
    const sdk = useSdkContext();
    const editor = useContentfulEditor();
    function handleClick(type) {
        return ()=>{
            if (!editor?.selection) return;
            toggleList(editor, {
                type
            });
            focus(editor);
        };
    }
    if (!editor) return null;
    return React.createElement(React.Fragment, null, isNodeTypeEnabled(sdk.field, BLOCKS.UL_LIST) && React.createElement(ToolbarButton, {
        title: "UL",
        testId: "ul-toolbar-button",
        onClick: handleClick(BLOCKS.UL_LIST),
        isActive: isListTypeActive(editor, BLOCKS.UL_LIST),
        isDisabled: props.isDisabled
    }, React.createElement(ListBulletedIcon, null)), isNodeTypeEnabled(sdk.field, BLOCKS.OL_LIST) && React.createElement(ToolbarButton, {
        title: "OL",
        testId: "ol-toolbar-button",
        onClick: handleClick(BLOCKS.OL_LIST),
        isActive: isListTypeActive(editor, BLOCKS.OL_LIST),
        isDisabled: props.isDisabled
    }, React.createElement(ListNumberedIcon, null)));
}
