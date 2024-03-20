import * as React from 'react';
import { EntityProvider } from '@contentful/field-editor-reference';
import { FieldConnector } from '@contentful/field-editor-shared';
import * as Contentful from '@contentful/rich-text-types';
import { PlateContent, Plate } from '@udecode/plate-common';
import { css, cx } from 'emotion';
import deepEquals from 'fast-deep-equal';
import noop from 'lodash/noop';
import { ContentfulEditorIdProvider, getContentfulEditorId } from './ContentfulEditorProvider';
import { toSlateValue } from './helpers/toSlateValue';
import { normalizeInitialValue } from './internal/misc';
import { getPlugins, disableCorePlugins } from './plugins';
import { styles } from './RichTextEditor.styles';
import { SdkProvider } from './SdkProvider';
import { SyncEditorChanges } from './SyncEditorChanges';
import Toolbar from './Toolbar';
import StickyToolbarWrapper from './Toolbar/components/StickyToolbarWrapper';
export const ConnectedRichTextEditor = (props)=>{
    const { sdk, onAction, restrictedMarks } = props;
    const id = getContentfulEditorId(sdk);
    const plugins = React.useMemo(()=>getPlugins(sdk, onAction ?? noop, restrictedMarks), [
        sdk,
        onAction,
        restrictedMarks
    ]);
    const initialValue = React.useMemo(()=>{
        return normalizeInitialValue({
            plugins,
            disableCorePlugins
        }, toSlateValue(props.value));
    }, [
        props.value,
        plugins
    ]);
    const classNames = cx(styles.editor, props.minHeight !== undefined ? css({
        minHeight: props.minHeight
    }) : undefined, props.maxHeight !== undefined ? css({
        maxHeight: props.maxHeight
    }) : undefined, props.isDisabled ? styles.disabled : styles.enabled, props.isToolbarHidden && styles.hiddenToolbar);
    return React.createElement(SdkProvider, {
        sdk: sdk
    }, React.createElement(ContentfulEditorIdProvider, {
        value: id
    }, React.createElement("div", {
        className: styles.root,
        "data-test-id": "rich-text-editor"
    }, React.createElement(Plate, {
        id: id,
        initialValue: initialValue,
        plugins: plugins,
        disableCorePlugins: disableCorePlugins
    }, !props.isToolbarHidden && React.createElement(StickyToolbarWrapper, {
        isDisabled: props.isDisabled
    }, React.createElement(Toolbar, {
        isDisabled: props.isDisabled
    })), React.createElement(SyncEditorChanges, {
        incomingValue: initialValue,
        onChange: props.onChange
    }), React.createElement(PlateContent, {
        id: id,
        className: classNames,
        readOnly: props.isDisabled
    })))));
};
const RichTextEditor = (props)=>{
    const { sdk, isInitiallyDisabled, onAction, restrictedMarks, ...otherProps } = props;
    const isEmptyValue = React.useCallback((value)=>!value || deepEquals(value, Contentful.EMPTY_DOCUMENT), []);
    const id = getContentfulEditorId(props.sdk);
    return React.createElement(EntityProvider, {
        sdk: sdk
    }, React.createElement(FieldConnector, {
        debounce: 0,
        field: sdk.field,
        isInitiallyDisabled: isInitiallyDisabled,
        isEmptyValue: isEmptyValue,
        isEqualValues: deepEquals
    }, ({ lastRemoteValue, disabled, setValue })=>React.createElement(ConnectedRichTextEditor, {
            ...otherProps,
            key: `rich-text-editor-${id}`,
            value: lastRemoteValue,
            sdk: sdk,
            onAction: onAction,
            isDisabled: disabled,
            onChange: setValue,
            restrictedMarks: restrictedMarks
        })));
};
export default RichTextEditor;
