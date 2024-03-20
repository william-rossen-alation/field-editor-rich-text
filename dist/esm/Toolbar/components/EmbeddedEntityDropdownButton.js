import * as React from 'react';
import { Button, Menu } from '@contentful/f36-components';
import { PlusIcon, ChevronDownIcon } from '@contentful/f36-icons';
export function EmbeddedEntityDropdownButton({ children, isDisabled, isOpen, onClose, onToggle }) {
    return React.createElement(Menu, {
        placement: "bottom-end",
        isOpen: isOpen,
        onClose: onClose,
        onOpen: onToggle
    }, React.createElement(Menu.Trigger, null, React.createElement(Button, {
        endIcon: React.createElement(ChevronDownIcon, null),
        testId: "toolbar-entity-dropdown-toggle",
        variant: "secondary",
        size: "small",
        startIcon: React.createElement(PlusIcon, null),
        isDisabled: isDisabled
    }, "Embed")), React.createElement(Menu.List, {
        className: "toolbar-entity-dropdown-list"
    }, children));
}
