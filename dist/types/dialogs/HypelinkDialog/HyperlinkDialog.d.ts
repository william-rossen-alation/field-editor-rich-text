export namespace LINK_TYPES {
    let URI: string;
    let ENTRY: string;
    let ASSET: string;
}
export class HyperlinkDialog extends React.Component<any, any, any> {
    static propTypes: {
        sdk: PropTypes.Validator<object>;
        labels: PropTypes.Requireable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            confirm: PropTypes.Requireable<string>;
        }>>;
        value: PropTypes.Requireable<PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            uri: PropTypes.Requireable<string>;
            target: PropTypes.Requireable<object>;
            type: PropTypes.Requireable<string>;
        }>>;
        entitySelectorConfigs: PropTypes.Requireable<object>;
        allowedHyperlinkTypes: PropTypes.Requireable<(string | null | undefined)[]>;
        hideText: PropTypes.Requireable<boolean>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
    };
    static defaultProps: {
        labels: {
            title: string;
            confirm: string;
        };
        value: {};
        hideText: boolean;
        entitySelectorConfigs: {};
        allowedHyperlinkTypes: string[];
    };
    constructor(props: any);
    state: {
        text: any;
        uri: any;
        entityLinks: {
            [x: string]: null;
        };
        type: any;
    };
    setTargetEntity(type: any, entity: any): void;
    getValue(): {
        type: any;
    };
    isLinkComplete(): any;
    handleSubmit: (event: any) => void;
    selectEntry: () => Promise<void>;
    selectAsset: () => Promise<void>;
    render(): JSX.Element;
    renderFields(): JSX.Element;
    renderEntityField(): JSX.Element;
    renderEntitySelector(type: any): JSX.Element;
}
export function openHyperlinkDialog(dialogs: any, { value, showTextInput, allowedHyperlinkTypes, entitySelectorConfigs }: {
    value: any;
    showTextInput: any;
    allowedHyperlinkTypes: any;
    entitySelectorConfigs: any;
}): any;
import * as React from 'react';
import PropTypes from 'prop-types';
