import * as React from 'react';
import { usePopper } from 'react-popper';
import { Popover, Stack, SectionHeading, ScreenReaderOnly, Flex, AssetIcon } from '@contentful/f36-components';
import { Portal } from '@contentful/f36-utils';
import { cx } from 'emotion';
import { useSdkContext } from '../../../SdkProvider';
import { useCommandList } from '../hooks/useCommandList';
import { useCommands } from '../useCommands';
import styles from './CommandList.styles';
const Group = ({ commandGroup, selectedItem })=>React.createElement("section", {
        key: commandGroup.group
    }, React.createElement(SectionHeading, {
        as: "h3",
        marginBottom: "spacingS",
        marginTop: "spacingS",
        marginLeft: "spacingM",
        marginRight: "spacingM"
    }, commandGroup.group), commandGroup.commands.map((command)=>React.createElement("button", {
            key: command.id,
            id: command.id,
            className: cx(styles.menuItem, {
                [styles.menuItemSelected]: command.id === selectedItem
            }),
            onClick: command.callback
        }, command.label)), React.createElement("hr", {
        className: styles.menuDivider,
        "aria-orientation": "horizontal"
    }));
const Asset = ({ command, selectedItem })=>React.createElement("button", {
        key: command.id,
        id: command.id,
        className: cx(styles.menuItem, {
            [styles.menuItemSelected]: command.id === selectedItem
        }),
        onClick: command.callback
    }, React.createElement(Flex, {
        alignItems: "center",
        gap: "spacingS"
    }, command.thumbnail ? React.createElement("img", {
        width: "30",
        height: "30",
        src: command.thumbnail,
        alt: "",
        className: styles.thumbnail
    }) : React.createElement(AssetIcon, {
        width: "30",
        height: "30",
        className: styles.thumbnail
    }), React.createElement("span", null, command.label)));
const Item = ({ command, selectedItem })=>React.createElement("button", {
        key: command.id,
        id: command.id,
        className: cx(styles.menuItem, {
            [styles.menuItemSelected]: command.id === selectedItem
        }),
        onClick: command.callback
    }, command.label);
const CommandListItems = ({ commandItems, selectedItem })=>{
    return React.createElement(React.Fragment, null, commandItems.map((command)=>{
        return 'group' in command ? React.createElement(Group, {
            key: command.group,
            commandGroup: command,
            selectedItem: selectedItem
        }) : command.asset ? React.createElement(Asset, {
            key: command.id,
            command: command,
            selectedItem: selectedItem
        }) : React.createElement(Item, {
            key: command.id,
            command: command,
            selectedItem: selectedItem
        });
    }));
};
export const CommandList = ({ query, editor, textContainer })=>{
    const sdk = useSdkContext();
    const popoverContainer = React.useRef(null);
    const popper = usePopper(textContainer, popoverContainer?.current, {
        placement: 'bottom-start'
    });
    const commandItems = useCommands(sdk, query, editor);
    const { selectedItem, isOpen } = useCommandList(commandItems, popoverContainer);
    if (!commandItems.length) {
        return null;
    }
    return React.createElement("div", {
        className: styles.container,
        tabIndex: -1,
        contentEditable: false
    }, React.createElement("div", {
        role: "alert"
    }, React.createElement(ScreenReaderOnly, null, "Richtext commands. Currently focused item: ", selectedItem, ". Press ", React.createElement("kbd", null, "enter"), " to select, ", React.createElement("kbd", null, "arrows"), " to navigate, ", React.createElement("kbd", null, "escape"), " to close.")), React.createElement(Portal, null, React.createElement("div", {
        "aria-hidden": true,
        ref: popoverContainer,
        className: styles.menuPoper,
        style: popper.styles.popper,
        ...popper.attributes.popper
    }, React.createElement(Popover, {
        isOpen: isOpen,
        usePortal: false,
        autoFocus: false
    }, React.createElement(Popover.Trigger, null, React.createElement("span", null)), React.createElement(Popover.Content, {
        className: styles.menuContent,
        testId: "rich-text-commands"
    }, React.createElement("header", {
        className: styles.menuHeader
    }, React.createElement(SectionHeading, {
        marginBottom: "none"
    }, "Richtext commands")), React.createElement("div", {
        className: styles.menuList,
        "data-test-id": "rich-text-commands-list"
    }, React.createElement(CommandListItems, {
        commandItems: commandItems,
        selectedItem: selectedItem
    })), React.createElement("footer", {
        className: styles.menuFooter
    }, React.createElement(Stack, {
        as: "ul",
        margin: "none",
        padding: "none",
        spacing: "spacingS",
        className: styles.footerList
    }, React.createElement("li", null, React.createElement("kbd", null, "↑"), React.createElement("kbd", null, "↓"), " to navigate"), React.createElement("li", null, React.createElement("kbd", null, "↵"), " to confirm"), React.createElement("li", null, React.createElement("kbd", null, "esc"), " to close"))))))));
};
