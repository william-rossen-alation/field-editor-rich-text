/// <reference types="react" />
import { FieldAppSDK } from '@contentful/app-sdk';
import { PlatePlugin } from '../internal/types';
import { RichTextTrackingActionHandler } from '../plugins/Tracking';
export declare const createTestEditor: (options: {
    input?: any;
    sdk?: FieldAppSDK;
    trackingHandler?: RichTextTrackingActionHandler;
    plugins?: PlatePlugin[];
}) => {
    editor: import("../internal").PlateEditor & Omit<import("slate").BaseEditor, "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid" | "id"> & {
        id: any;
        children: import("../internal").Value;
        operations: import("@udecode/slate").TOperation<import("@udecode/slate").TDescendant>[];
        marks: Record<string, any> | null;
        isInline: <N extends import("@udecode/slate").TElement>(element: N) => boolean;
        isVoid: <N_1 extends import("@udecode/slate").TElement>(element: N_1) => boolean;
        markableVoid: <N_2 extends import("@udecode/slate").TElement>(element: N_2) => boolean;
        normalizeNode: <N_3 extends import("@udecode/slate").TNode>(entry: import("@udecode/slate").TNodeEntry<N_3>) => void;
        apply: <N_4 extends import("@udecode/slate").TDescendant>(operation: import("@udecode/slate").TOperation<N_4>) => void;
        getFragment: <N_5 extends import("@udecode/slate").TDescendant>() => N_5[];
        insertFragment: <N_6 extends import("@udecode/slate").TDescendant>(fragment: N_6[]) => void;
        insertNode: <N_7 extends import("@udecode/slate").TDescendant>(node: N_7) => void;
        getDirtyPaths: <N_8 extends import("@udecode/slate").TDescendant>(operation: import("@udecode/slate").TOperation<N_8>) => import("slate").Path[];
    } & import("@udecode/utils").UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "insertTextData" | "setFragmentData" | "hasRange" | "hasTarget" | "hasEditableTarget" | "hasSelectableTarget" | "isTargetInsideNonReadonlyVoid"> & import("@udecode/plate-core").PlateEditorMethods<import("../internal").Value> & {
        key: any;
        plugins: import("@udecode/plate-core").WithPlatePlugin<{}, import("../internal").Value, import("@udecode/plate-core").PlateEditor<import("../internal").Value>>[];
        pluginsByKey: Record<string, import("@udecode/plate-core").WithPlatePlugin<{}, import("../internal").Value, import("@udecode/plate-core").PlateEditor<import("../internal").Value>>>;
        prevSelection: import("slate").BaseRange | null;
        blockFactory: (node?: Partial<import("@udecode/slate").TElement> | undefined, path?: import("slate").Path | undefined) => import("@udecode/slate").TElement;
        childrenFactory: () => import("../internal").Value;
        isFallback: boolean;
        currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
    };
    normalize: () => void;
};
