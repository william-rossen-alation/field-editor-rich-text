import * as React from 'react';
import tokens from '@contentful/f36-tokens';
import { css } from 'emotion';
const style = css`
  margin: 0;
  list-style: inherit;
  margin-top: ${tokens.spacingXs};

  ol,
  ul {
    margin: 0 0 0 ${tokens.spacingL};
  }
`;
export function ListItem(props) {
    return React.createElement("li", {
        ...props.attributes,
        className: style
    }, props.children);
}
