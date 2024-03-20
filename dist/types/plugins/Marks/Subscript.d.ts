import { MARKS } from '@contentful/rich-text-types';
import { PlatePlugin, RenderLeafProps } from '../../internal/types';
export declare const ToolbarSubscriptButton: {
    ({ isDisabled }: {
        isDisabled?: boolean | undefined;
    }): JSX.Element | null;
    displayName: MARKS;
};
export declare const ToolbarDropdownSubscriptButton: {
    ({ isDisabled }: {
        isDisabled?: boolean | undefined;
    }): JSX.Element | null;
    displayName: MARKS;
};
export declare function Subscript(props: RenderLeafProps): JSX.Element;
export declare const createSubscriptPlugin: () => PlatePlugin;
