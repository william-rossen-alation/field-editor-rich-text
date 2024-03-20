import * as React from 'react';
import { Flex, IconButton, Menu } from '@contentful/f36-components';
import { MoreHorizontalIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { css } from 'emotion';
import { useContentfulEditor } from '../ContentfulEditorProvider';
import { isNodeTypeSelected } from '../helpers/editor';
import { isMarkEnabled, isNodeTypeEnabled } from '../helpers/validations';
import { isMarkActive } from '../internal/queries';
import { ToolbarHeadingButton } from '../plugins/Heading';
import { ToolbarHrButton } from '../plugins/Hr';
import { ToolbarHyperlinkButton } from '../plugins/Hyperlink';
import { ToolbarListButton } from '../plugins/List';
import { ToolbarBoldButton } from '../plugins/Marks/Bold';
import { ToolbarCodeButton, ToolbarDropdownCodeButton } from '../plugins/Marks/Code';
import { ToolbarItalicButton } from '../plugins/Marks/Italic';
import { ToolbarDropdownSubscriptButton, ToolbarSubscriptButton } from '../plugins/Marks/Subscript';
import { ToolbarDropdownSuperscriptButton, ToolbarSuperscriptButton } from '../plugins/Marks/Superscript';
import { ToolbarUnderlineButton } from '../plugins/Marks/Underline';
import { ToolbarQuoteButton } from '../plugins/Quote';
import { ToolbarTableButton } from '../plugins/Table';
import { useSdkContext } from '../SdkProvider';
import { ButtonRedo } from './components/ButtonRedo';
import { ButtonUndo } from './components/ButtonUndo';
import { EmbedEntityWidget } from './components/EmbedEntityWidget';
const styles = {
    toolbar: css({
        border: `1px solid ${tokens.gray400}`,
        backgroundColor: tokens.gray100,
        padding: tokens.spacingXs,
        borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0`
    }),
    toolbarBtn: css({
        height: '30px',
        width: '30px',
        marginLeft: tokens.spacing2Xs,
        marginRight: tokens.spacing2Xs
    }),
    divider: css({
        display: 'inline-block',
        height: '21px',
        width: '1px',
        background: tokens.gray300,
        margin: `0 ${tokens.spacing2Xs}`
    }),
    embedActionsWrapper: css({
        display: [
            '-webkit-box',
            '-ms-flexbox',
            'flex'
        ],
        webkitAlignSelf: 'flex-start',
        alignSelf: 'flex-start',
        msFlexItemAlign: 'start'
    }),
    formattingOptionsWrapper: css({
        display: [
            '-webkit-box',
            '-ms-flexbox',
            'flex'
        ],
        msFlexAlign: 'center',
        webkitBoxAlign: 'center',
        alignItems: 'center',
        msFlexWrap: 'wrap',
        flexWrap: 'wrap',
        marginRight: '20px'
    })
};
const Dropdown = ({ sdk, isDisabled })=>{
    const editor = useContentfulEditor();
    const isActive = editor && (isMarkActive(editor, MARKS.SUPERSCRIPT) || isMarkActive(editor, MARKS.SUBSCRIPT) || isMarkActive(editor, MARKS.CODE));
    return React.createElement(Menu, null, React.createElement(Menu.Trigger, null, React.createElement("span", null, React.createElement(IconButton, {
        size: "small",
        className: styles.toolbarBtn,
        variant: isActive ? 'secondary' : 'transparent',
        icon: React.createElement(MoreHorizontalIcon, null),
        "aria-label": "toggle menu",
        isDisabled: isDisabled,
        testId: "dropdown-toolbar-button"
    }))), React.createElement(Menu.List, null, isMarkEnabled(sdk.field, MARKS.SUPERSCRIPT) && React.createElement(ToolbarDropdownSuperscriptButton, {
        isDisabled: isDisabled
    }), isMarkEnabled(sdk.field, MARKS.SUBSCRIPT) && React.createElement(ToolbarDropdownSubscriptButton, {
        isDisabled: isDisabled
    }), isMarkEnabled(sdk.field, MARKS.CODE) && React.createElement(ToolbarDropdownCodeButton, {
        isDisabled: isDisabled
    })));
};
const Toolbar = ({ isDisabled })=>{
    const sdk = useSdkContext();
    const editor = useContentfulEditor();
    const canInsertBlocks = !isNodeTypeSelected(editor, BLOCKS.TABLE);
    const validationInfo = React.useMemo(()=>getValidationInfo(sdk.field), [
        sdk.field
    ]);
    const isListSelected = isNodeTypeSelected(editor, BLOCKS.UL_LIST) || isNodeTypeSelected(editor, BLOCKS.OL_LIST);
    const isBlockquoteSelected = isNodeTypeSelected(editor, BLOCKS.QUOTE);
    const shouldDisableTables = isDisabled || !canInsertBlocks || isListSelected || isBlockquoteSelected;
    const boldItalicUnderlineAvailable = isMarkEnabled(sdk.field, MARKS.BOLD) || isMarkEnabled(sdk.field, MARKS.ITALIC) || isMarkEnabled(sdk.field, MARKS.UNDERLINE);
    const dropdownItemsAvailable = isMarkEnabled(sdk.field, MARKS.SUPERSCRIPT) || isMarkEnabled(sdk.field, MARKS.SUBSCRIPT) || isMarkEnabled(sdk.field, MARKS.CODE);
    const shouldShowDropdown = boldItalicUnderlineAvailable && dropdownItemsAvailable;
    return React.createElement(Flex, {
        gap: "spacingS",
        flexWrap: "wrap",
        flexDirection: "row",
        testId: "toolbar",
        className: styles.toolbar,
        justifyContent: "space-between"
    }, React.createElement("div", {
        className: styles.formattingOptionsWrapper
    }, React.createElement(ToolbarHeadingButton, {
        isDisabled: isDisabled || !canInsertBlocks
    }), React.createElement("span", {
        className: styles.divider
    }), React.createElement(ButtonUndo, null), React.createElement(ButtonRedo, null), validationInfo.isAnyMarkEnabled && React.createElement("span", {
        className: styles.divider
    }), isMarkEnabled(sdk.field, MARKS.BOLD) && React.createElement(ToolbarBoldButton, {
        isDisabled: isDisabled
    }), isMarkEnabled(sdk.field, MARKS.ITALIC) && React.createElement(ToolbarItalicButton, {
        isDisabled: isDisabled
    }), isMarkEnabled(sdk.field, MARKS.UNDERLINE) && React.createElement(ToolbarUnderlineButton, {
        isDisabled: isDisabled
    }), !boldItalicUnderlineAvailable && isMarkEnabled(sdk.field, MARKS.SUPERSCRIPT) && React.createElement(ToolbarSuperscriptButton, {
        isDisabled: isDisabled
    }), !boldItalicUnderlineAvailable && isMarkEnabled(sdk.field, MARKS.SUBSCRIPT) && React.createElement(ToolbarSubscriptButton, {
        isDisabled: isDisabled
    }), !boldItalicUnderlineAvailable && isMarkEnabled(sdk.field, MARKS.CODE) && React.createElement(ToolbarCodeButton, {
        isDisabled: isDisabled
    }), shouldShowDropdown && React.createElement(Dropdown, {
        sdk: sdk,
        isDisabled: isDisabled
    }), validationInfo.isAnyHyperlinkEnabled && React.createElement(React.Fragment, null, React.createElement("span", {
        className: styles.divider
    }), React.createElement(ToolbarHyperlinkButton, {
        isDisabled: isDisabled
    })), validationInfo.isAnyBlockFormattingEnabled && React.createElement("span", {
        className: styles.divider
    }), React.createElement(ToolbarListButton, {
        isDisabled: isDisabled || !canInsertBlocks
    }), isNodeTypeEnabled(sdk.field, BLOCKS.QUOTE) && React.createElement(ToolbarQuoteButton, {
        isDisabled: isDisabled || !canInsertBlocks
    }), isNodeTypeEnabled(sdk.field, BLOCKS.HR) && React.createElement(ToolbarHrButton, {
        isDisabled: isDisabled || !canInsertBlocks
    }), isNodeTypeEnabled(sdk.field, BLOCKS.TABLE) && React.createElement(ToolbarTableButton, {
        isDisabled: shouldDisableTables
    })), React.createElement("div", {
        className: styles.embedActionsWrapper
    }, React.createElement(EmbedEntityWidget, {
        isDisabled: isDisabled,
        canInsertBlocks: canInsertBlocks
    })));
};
function getValidationInfo(field) {
    const someWithValidation = (vals, validation)=>vals.some((val)=>validation(field, val));
    const isAnyMarkEnabled = someWithValidation(Object.values(MARKS), isMarkEnabled);
    const isAnyHyperlinkEnabled = someWithValidation([
        INLINES.HYPERLINK,
        INLINES.ASSET_HYPERLINK,
        INLINES.ENTRY_HYPERLINK,
        INLINES.RESOURCE_HYPERLINK
    ], isNodeTypeEnabled);
    const isAnyBlockFormattingEnabled = someWithValidation([
        BLOCKS.UL_LIST,
        BLOCKS.OL_LIST,
        BLOCKS.QUOTE,
        BLOCKS.HR
    ], isNodeTypeEnabled);
    return {
        isAnyMarkEnabled,
        isAnyHyperlinkEnabled,
        isAnyBlockFormattingEnabled
    };
}
export default Toolbar;
