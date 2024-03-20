import * as React from 'react';
import tokens from '@contentful/f36-tokens';
import { BLOCKS } from '@contentful/rich-text-types';
import { css } from 'emotion';
const styles = {
    [BLOCKS.PARAGRAPH]: css`
    line-height: ${tokens.lineHeightDefault};
    margin-bottom: 1.5em;
  `
};
export function Paragraph(props) {
    return React.createElement("div", {
        ...props.attributes,
        className: styles[BLOCKS.PARAGRAPH]
    }, props.children);
}
