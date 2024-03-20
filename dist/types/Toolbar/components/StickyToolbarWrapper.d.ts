import { ReactNode } from 'react';
type StickyToolbarProps = {
    isDisabled?: boolean;
    children: ReactNode;
};
declare const StickyToolbarWrapper: ({ isDisabled, children }: StickyToolbarProps) => JSX.Element;
export default StickyToolbarWrapper;
