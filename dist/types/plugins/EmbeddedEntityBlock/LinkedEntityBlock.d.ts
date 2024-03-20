import { EntityLink } from '@contentful/field-editor-reference';
import { Element, RenderElementProps } from '../../internal/types';
type LinkedEntityBlockProps = {
    element: Element & {
        data: {
            target: EntityLink;
        };
    };
    attributes: Pick<RenderElementProps, 'attributes'>;
    children: Pick<RenderElementProps, 'children'>;
};
export declare function LinkedEntityBlock(props: LinkedEntityBlockProps): JSX.Element;
export {};
