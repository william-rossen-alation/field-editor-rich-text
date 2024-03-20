import * as React from 'react';
import { SuperscriptIcon } from '@contentful/f36-icons';
import { MARKS } from '@contentful/rich-text-types';
import { createSuperscriptPlugin as createDefaultSuperscriptPlugin } from '@udecode/plate-basic-marks';
import { css } from 'emotion';
import { createMarkToolbarButton } from './components/MarkToolbarButton';
import { buildMarkEventHandler } from './helpers';
const styles = {
    superscript: css({
        verticalAlign: 'super',
        fontSize: 'smaller'
    })
};
export const ToolbarSuperscriptButton = createMarkToolbarButton({
    title: 'Superscript',
    mark: MARKS.SUPERSCRIPT,
    icon: React.createElement(SuperscriptIcon, null)
});
export const ToolbarDropdownSuperscriptButton = createMarkToolbarButton({
    title: 'Superscript',
    mark: MARKS.SUPERSCRIPT
});
export function Superscript(props) {
    return React.createElement("sup", {
        ...props.attributes,
        className: styles.superscript
    }, props.children);
}
export const createSuperscriptPlugin = ()=>createDefaultSuperscriptPlugin({
        type: MARKS.SUPERSCRIPT,
        component: Superscript,
        handlers: {
            onKeyDown: buildMarkEventHandler(MARKS.SUPERSCRIPT)
        },
        deserializeHtml: {
            rules: [
                {
                    validNodeName: [
                        'SUP'
                    ]
                }
            ]
        }
    });
