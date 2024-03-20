"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandList", {
    enumerable: true,
    get: function() {
        return CommandList;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _reactpopper = require("react-popper");
const _f36components = require("@contentful/f36-components");
const _f36utils = require("@contentful/f36-utils");
const _emotion = require("emotion");
const _SdkProvider = require("../../../SdkProvider");
const _useCommandList = require("../hooks/useCommandList");
const _useCommands = require("../useCommands");
const _CommandListstyles = _interop_require_default(require("./CommandList.styles"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const Group = ({ commandGroup, selectedItem })=>_react.createElement("section", {
        key: commandGroup.group
    }, _react.createElement(_f36components.SectionHeading, {
        as: "h3",
        marginBottom: "spacingS",
        marginTop: "spacingS",
        marginLeft: "spacingM",
        marginRight: "spacingM"
    }, commandGroup.group), commandGroup.commands.map((command)=>_react.createElement("button", {
            key: command.id,
            id: command.id,
            className: (0, _emotion.cx)(_CommandListstyles.default.menuItem, {
                [_CommandListstyles.default.menuItemSelected]: command.id === selectedItem
            }),
            onClick: command.callback
        }, command.label)), _react.createElement("hr", {
        className: _CommandListstyles.default.menuDivider,
        "aria-orientation": "horizontal"
    }));
const Asset = ({ command, selectedItem })=>_react.createElement("button", {
        key: command.id,
        id: command.id,
        className: (0, _emotion.cx)(_CommandListstyles.default.menuItem, {
            [_CommandListstyles.default.menuItemSelected]: command.id === selectedItem
        }),
        onClick: command.callback
    }, _react.createElement(_f36components.Flex, {
        alignItems: "center",
        gap: "spacingS"
    }, command.thumbnail ? _react.createElement("img", {
        width: "30",
        height: "30",
        src: command.thumbnail,
        alt: "",
        className: _CommandListstyles.default.thumbnail
    }) : _react.createElement(_f36components.AssetIcon, {
        width: "30",
        height: "30",
        className: _CommandListstyles.default.thumbnail
    }), _react.createElement("span", null, command.label)));
const Item = ({ command, selectedItem })=>_react.createElement("button", {
        key: command.id,
        id: command.id,
        className: (0, _emotion.cx)(_CommandListstyles.default.menuItem, {
            [_CommandListstyles.default.menuItemSelected]: command.id === selectedItem
        }),
        onClick: command.callback
    }, command.label);
const CommandListItems = ({ commandItems, selectedItem })=>{
    return _react.createElement(_react.Fragment, null, commandItems.map((command)=>{
        return 'group' in command ? _react.createElement(Group, {
            key: command.group,
            commandGroup: command,
            selectedItem: selectedItem
        }) : command.asset ? _react.createElement(Asset, {
            key: command.id,
            command: command,
            selectedItem: selectedItem
        }) : _react.createElement(Item, {
            key: command.id,
            command: command,
            selectedItem: selectedItem
        });
    }));
};
const CommandList = ({ query, editor, textContainer })=>{
    const sdk = (0, _SdkProvider.useSdkContext)();
    const popoverContainer = _react.useRef(null);
    const popper = (0, _reactpopper.usePopper)(textContainer, popoverContainer?.current, {
        placement: 'bottom-start'
    });
    const commandItems = (0, _useCommands.useCommands)(sdk, query, editor);
    const { selectedItem, isOpen } = (0, _useCommandList.useCommandList)(commandItems, popoverContainer);
    if (!commandItems.length) {
        return null;
    }
    return _react.createElement("div", {
        className: _CommandListstyles.default.container,
        tabIndex: -1,
        contentEditable: false
    }, _react.createElement("div", {
        role: "alert"
    }, _react.createElement(_f36components.ScreenReaderOnly, null, "Richtext commands. Currently focused item: ", selectedItem, ". Press ", _react.createElement("kbd", null, "enter"), " to select, ", _react.createElement("kbd", null, "arrows"), " to navigate, ", _react.createElement("kbd", null, "escape"), " to close.")), _react.createElement(_f36utils.Portal, null, _react.createElement("div", {
        "aria-hidden": true,
        ref: popoverContainer,
        className: _CommandListstyles.default.menuPoper,
        style: popper.styles.popper,
        ...popper.attributes.popper
    }, _react.createElement(_f36components.Popover, {
        isOpen: isOpen,
        usePortal: false,
        autoFocus: false
    }, _react.createElement(_f36components.Popover.Trigger, null, _react.createElement("span", null)), _react.createElement(_f36components.Popover.Content, {
        className: _CommandListstyles.default.menuContent,
        testId: "rich-text-commands"
    }, _react.createElement("header", {
        className: _CommandListstyles.default.menuHeader
    }, _react.createElement(_f36components.SectionHeading, {
        marginBottom: "none"
    }, "Richtext commands")), _react.createElement("div", {
        className: _CommandListstyles.default.menuList,
        "data-test-id": "rich-text-commands-list"
    }, _react.createElement(CommandListItems, {
        commandItems: commandItems,
        selectedItem: selectedItem
    })), _react.createElement("footer", {
        className: _CommandListstyles.default.menuFooter
    }, _react.createElement(_f36components.Stack, {
        as: "ul",
        margin: "none",
        padding: "none",
        spacing: "spacingS",
        className: _CommandListstyles.default.footerList
    }, _react.createElement("li", null, _react.createElement("kbd", null, "↑"), _react.createElement("kbd", null, "↓"), " to navigate"), _react.createElement("li", null, _react.createElement("kbd", null, "↵"), " to confirm"), _react.createElement("li", null, _react.createElement("kbd", null, "esc"), " to close"))))))));
};
