import { Link } from '@contentful/field-editor-reference';
import { FieldAppSDK } from '@contentful/field-editor-shared';
import { ResourceLink } from '@contentful/rich-text-types';
import { PlateEditor, Path } from '../../internal/types';
import { TrackingPluginActions } from '../../plugins/Tracking';
interface HyperlinkModalProps {
    linkText?: string;
    linkType?: string;
    linkTarget?: string;
    linkEntity?: Link | ResourceLink;
    onClose: (value: unknown) => void;
    sdk: FieldAppSDK;
    readonly: boolean;
}
export declare function HyperlinkModal(props: HyperlinkModalProps): JSX.Element;
export declare function addOrEditLink(editor: PlateEditor, sdk: FieldAppSDK, logAction: TrackingPluginActions['onToolbarAction'] | TrackingPluginActions['onShortcutAction'] | TrackingPluginActions['onViewportAction'], targetPath?: Path): Promise<void>;
export {};
