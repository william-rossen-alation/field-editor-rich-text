import * as React from 'react';
import { HyperlinkDialog } from './HypelinkDialog/HyperlinkDialog';
export const renderRichTextDialog = (sdk)=>{
    const parameters = sdk.parameters.invocation;
    if (parameters?.type === 'rich-text-hyperlink-dialog') {
        sdk.window.startAutoResizer();
        return React.createElement(HyperlinkDialog, {
            ...parameters,
            onClose: sdk.close,
            sdk: sdk
        });
    }
    return React.createElement("div", null);
};
