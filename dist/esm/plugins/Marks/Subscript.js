import * as React from 'react';
import { SubscriptIcon } from '@contentful/f36-icons';
import { MARKS } from '@contentful/rich-text-types';
import { createSubscriptPlugin as createDefaultSubscriptPlugin } from '@udecode/plate-basic-marks';
import { css } from 'emotion';
import { createMarkToolbarButton } from './components/MarkToolbarButton';
import { buildMarkEventHandler } from './helpers';
const styles = {
    subscript: css({
        verticalAlign: 'sub',
        fontSize: 'smaller'
    })
};
export const ToolbarSubscriptButton = createMarkToolbarButton({
    title: 'Subscript',
    mark: MARKS.SUBSCRIPT,
    icon: React.createElement(SubscriptIcon, {
        viewBox: "0 0 23 18"
    })
});
export const ToolbarDropdownSubscriptButton = createMarkToolbarButton({
    title: 'Subscript',
    mark: MARKS.SUBSCRIPT
});
export function Subscript(props) {
    return React.createElement("sub", {
        ...props.attributes,
        className: styles.subscript
    }, props.children);
}
export const createSubscriptPlugin = ()=>createDefaultSubscriptPlugin({
        type: MARKS.SUBSCRIPT,
        component: Subscript,
        handlers: {
            onKeyDown: buildMarkEventHandler(MARKS.SUBSCRIPT)
        },
        deserializeHtml: {
            rules: [
                {
                    validNodeName: [
                        'SUB'
                    ]
                }
            ]
        }
    });
