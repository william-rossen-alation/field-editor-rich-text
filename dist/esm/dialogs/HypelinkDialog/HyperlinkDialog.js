function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
import * as React from 'react';
import { Button, Form, FormControl, FormLabel, ModalContent, ModalControls, Select, TextInput, TextLink } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import { EntityProvider } from '@contentful/field-editor-reference';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { FetchingWrappedAssetCard } from '../../plugins/shared/FetchingWrappedAssetCard';
import { FetchingWrappedEntryCard } from '../../plugins/shared/FetchingWrappedEntryCard';
export const LINK_TYPES = {
    URI: 'uri',
    ENTRY: 'Entry',
    ASSET: 'Asset'
};
function isFeaturingEntitySelector(entitySelectorConfigs = {}) {
    return !!entitySelectorConfigs.Entry || !!entitySelectorConfigs.Asset;
}
function entityToLink(entity) {
    const { id, type } = entity.sys;
    return {
        sys: {
            id,
            type: 'Link',
            linkType: type
        }
    };
}
var _React_Component;
export class HyperlinkDialog extends (_React_Component = React.Component) {
    setTargetEntity(type, entity) {
        this.setState((state)=>({
                entityLinks: {
                    ...state.entityLinks,
                    [type]: entity ? entityToLink(entity) : undefined
                }
            }));
    }
    getValue() {
        const { text, type, uri } = this.state;
        const value = {
            type
        };
        if (text) {
            value.text = text;
        }
        if (type === LINK_TYPES.URI) {
            value.uri = uri;
        } else {
            value.target = this.state.entityLinks[type];
        }
        return value;
    }
    isLinkComplete() {
        const { text, type, uri, target } = this.getValue();
        const requiresText = !this.props.hideText;
        if (requiresText && !text) {
            return false;
        }
        return type === LINK_TYPES.URI && uri || target;
    }
    render() {
        const { labels } = this.props;
        return React.createElement(EntityProvider, {
            sdk: this.props.sdk
        }, React.createElement(React.Fragment, null, React.createElement(ModalContent, null, this.renderFields()), React.createElement(ModalControls, null, React.createElement(Button, {
            type: "button",
            onClick: ()=>this.props.onClose(null),
            variant: "secondary",
            testId: "cancel-cta",
            size: "small"
        }, "Cancel"), React.createElement(Button, {
            type: "submit",
            variant: "positive",
            onClick: this.handleSubmit,
            isDisabled: !this.isLinkComplete(),
            testId: "confirm-cta",
            size: "small"
        }, labels.confirm))));
    }
    renderFields() {
        const { hideText, allowedHyperlinkTypes, entitySelectorConfigs } = this.props;
        const { uri, text, type } = this.state;
        const isUriInputAutoFocused = type === LINK_TYPES.URI && (hideText || !!text);
        return React.createElement(Form, null, hideText ? null : React.createElement(FormControl, {
            id: "link-text",
            isRequired: true
        }, React.createElement(FormControl.Label, null, "Link text"), React.createElement(TextInput, {
            testId: "link-text-input",
            name: "link-text",
            value: text || '',
            onChange: (e)=>this.setState({
                    text: e.target.value
                }),
            autoFocus: !isUriInputAutoFocused
        })), isFeaturingEntitySelector(entitySelectorConfigs) && React.createElement(FormControl, {
            id: "link-type",
            name: "link-type"
        }, React.createElement(FormControl.Label, null, "Link type"), React.createElement(Select, {
            value: type,
            onChange: (e)=>this.setState({
                    type: e.target.value
                }),
            testId: "link-type-select"
        }, allowedHyperlinkTypes.includes(LINK_TYPES.URI) || type === LINK_TYPES.URI ? React.createElement(Select.Option, {
            value: LINK_TYPES.URI
        }, "URL") : null, allowedHyperlinkTypes.includes(LINK_TYPES.ENTRY) || type === LINK_TYPES.ENTRY ? React.createElement(Select.Option, {
            value: LINK_TYPES.ENTRY
        }, "Entry") : null, allowedHyperlinkTypes.includes(LINK_TYPES.ASSET) || type === LINK_TYPES.ASSET ? React.createElement(Select.Option, {
            value: LINK_TYPES.ASSET
        }, "Asset") : null)), type === LINK_TYPES.URI ? React.createElement(FormControl, {
            id: "link-uri",
            isRequired: true
        }, React.createElement(FormControl.Label, null, "Link target"), React.createElement(TextInput, {
            testId: "link-target-input",
            name: "link-uri",
            value: uri || '',
            placeholder: "https://",
            onChange: (e)=>this.setState({
                    uri: e.target.value
                }),
            autoFocus: isUriInputAutoFocused
        }), React.createElement(FormControl.HelpText, null, "A protocol may be required, e.g. https://")) : this.renderEntityField());
    }
    renderEntityField() {
        const { type, entityLinks } = this.state;
        const resetEntity = ()=>this.setTargetEntity(type, null);
        const entityLink = entityLinks[type];
        const isEntitySelectorVisible = !entityLink;
        return React.createElement("div", null, React.createElement(FormLabel, {
            required: true,
            htmlFor: ""
        }, "Link target"), !isEntitySelectorVisible && React.createElement(TextLink, {
            as: "button",
            className: css({
                marginLeft: tokens.spacingS
            }),
            onClick: resetEntity
        }, "Remove selection"), entityLink && React.createElement("div", null, type === LINK_TYPES.ENTRY && React.createElement(FetchingWrappedEntryCard, {
            sdk: this.props.sdk,
            locale: this.props.entitySelectorConfigs.Entry.locale,
            entryId: entityLink.sys.id,
            isDisabled: true,
            isSelected: false
        }), type == LINK_TYPES.ASSET && React.createElement(FetchingWrappedAssetCard, {
            sdk: this.props.sdk,
            locale: this.props.entitySelectorConfigs.Asset.locale,
            assetId: entityLink.sys.id,
            isDisabled: true,
            isSelected: false
        })), isEntitySelectorVisible && this.renderEntitySelector(type, isEntitySelectorVisible));
    }
    renderEntitySelector(type) {
        return React.createElement("div", {
            className: css({
                marginTop: tokens.spacingS
            })
        }, type === LINK_TYPES.ENTRY && React.createElement(TextLink, {
            as: "button",
            onClick: this.selectEntry
        }, "Select entry"), type === LINK_TYPES.ASSET && React.createElement(TextLink, {
            as: "button",
            onClick: this.selectAsset
        }, "Select asset"));
    }
    constructor(props){
        super(props);
        _define_property(this, "handleSubmit", (event)=>{
            event.preventDefault();
            this.props.onClose(this.getValue());
        });
        _define_property(this, "selectEntry", async ()=>{
            const { locale, contentTypes } = this.props.entitySelectorConfigs.Entry;
            const entry = await this.props.sdk.dialogs.selectSingleEntry({
                locale,
                contentTypes
            });
            this.setTargetEntity(LINK_TYPES.ENTRY, entry);
        });
        _define_property(this, "selectAsset", async ()=>{
            const { locale } = this.props.entitySelectorConfigs.Asset;
            const asset = await this.props.sdk.dialogs.selectSingleAsset({
                locale
            });
            this.setTargetEntity(LINK_TYPES.ASSET, asset);
        });
        const { text, type, uri, target } = props.value;
        const isEntityLink = Boolean(target);
        const entityLinks = {
            [LINK_TYPES.ENTRY]: null,
            [LINK_TYPES.ASSET]: null
        };
        let linkType = type;
        if (isEntityLink) {
            linkType = target.sys.linkType;
            entityLinks[linkType] = target;
        } else if (props.allowedHyperlinkTypes.includes(LINK_TYPES.URI)) {
            linkType = LINK_TYPES.URI;
        } else {
            linkType = props.allowedHyperlinkTypes[0];
        }
        this.state = {
            text,
            uri,
            entityLinks,
            type: linkType
        };
    }
}
_define_property(HyperlinkDialog, "propTypes", {
    sdk: PropTypes.object.isRequired,
    labels: PropTypes.shape({
        title: PropTypes.string,
        confirm: PropTypes.string
    }),
    value: PropTypes.shape({
        text: PropTypes.string,
        uri: PropTypes.string,
        target: PropTypes.object,
        type: PropTypes.oneOf([
            'uri',
            'Entry',
            'Asset'
        ])
    }),
    entitySelectorConfigs: PropTypes.object,
    allowedHyperlinkTypes: PropTypes.arrayOf(PropTypes.oneOf([
        LINK_TYPES.ENTRY,
        LINK_TYPES.ASSET,
        LINK_TYPES.URI
    ])),
    hideText: PropTypes.bool,
    onClose: PropTypes.func.isRequired
});
_define_property(HyperlinkDialog, "defaultProps", {
    labels: {
        title: 'Insert link',
        confirm: 'Insert link'
    },
    value: {},
    hideText: false,
    entitySelectorConfigs: {},
    allowedHyperlinkTypes: [
        LINK_TYPES.ENTRY,
        LINK_TYPES.ASSET,
        LINK_TYPES.URI
    ]
});
export const openHyperlinkDialog = (dialogs, { value, showTextInput, allowedHyperlinkTypes, entitySelectorConfigs })=>{
    const isNew = !(value.uri || value.target);
    const props = {
        labels: {
            title: isNew ? 'Insert hyperlink' : 'Edit hyperlink',
            confirm: isNew ? 'Insert' : 'Update'
        },
        value,
        hideText: !showTextInput,
        allowedHyperlinkTypes,
        entitySelectorConfigs
    };
    return dialogs.openCurrent({
        title: props.labels.title,
        width: 'large',
        shouldCloseOnEscapePress: true,
        shouldCloseOnOverlayClick: true,
        allowHeightOverflow: true,
        parameters: {
            type: 'rich-text-hyperlink-dialog',
            ...props
        }
    });
};
