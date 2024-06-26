import React from 'react';
import { css } from 'emotion';
const styles = {
    nativeSticky: css`
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    z-index: 2;
  `
};
const StickyToolbarWrapper = ({ isDisabled, children })=>React.createElement("div", {
        className: isDisabled ? '' : styles.nativeSticky
    }, children);
export default StickyToolbarWrapper;
