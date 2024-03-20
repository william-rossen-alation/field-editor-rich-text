import * as React from 'react';
import { Badge } from '@contentful/f36-components';
export const ResourceNewBadge = ()=>{
    return React.createElement(React.Fragment, null, ' ', "(different space)", ' ', React.createElement(Badge, {
        variant: "primary-filled",
        size: "small"
    }, "new"));
};
