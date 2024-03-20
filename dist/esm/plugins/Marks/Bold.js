import * as React from 'react';
import { FormatBoldIcon } from '@contentful/f36-icons';
import { MARKS } from '@contentful/rich-text-types';
import { createBoldPlugin as createDefaultBoldPlugin } from '@udecode/plate-basic-marks';
import { css } from 'emotion';
import { someHtmlElement } from '../../internal/queries';
import { createMarkToolbarButton } from './components/MarkToolbarButton';
import { buildMarkEventHandler } from './helpers';
export const ToolbarBoldButton = createMarkToolbarButton({
    title: 'Bold',
    mark: MARKS.BOLD,
    icon: React.createElement(FormatBoldIcon, null)
});
const styles = {
    bold: css({
        fontWeight: 600
    })
};
export function Bold(props) {
    return React.createElement("strong", {
        ...props.attributes,
        className: styles.bold
    }, props.children);
}
const isGoogleBoldWrapper = (el)=>el.id.startsWith('docs-internal-guid') && el.nodeName === 'B';
export const createBoldPlugin = ()=>createDefaultBoldPlugin({
        type: MARKS.BOLD,
        component: Bold,
        options: {
            hotkey: [
                'mod+b'
            ]
        },
        handlers: {
            onKeyDown: buildMarkEventHandler(MARKS.BOLD)
        },
        deserializeHtml: {
            rules: [
                {
                    validNodeName: [
                        'STRONG',
                        'B'
                    ]
                },
                {
                    validStyle: {
                        fontWeight: [
                            '600',
                            '700',
                            'bold'
                        ]
                    }
                }
            ],
            query: (el)=>{
                return !isGoogleBoldWrapper(el) && !someHtmlElement(el, (node)=>node.style.fontWeight === 'normal');
            }
        }
    });
