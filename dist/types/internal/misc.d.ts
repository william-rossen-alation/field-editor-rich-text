/// <reference types="react" />
import * as p from '@udecode/plate-common';
import * as s from 'slate';
import type { Value, PlateEditor, Location, PlatePlugin } from './types';
export type CreatePlateEditorOptions = Omit<p.CreatePlateEditorOptions<Value, PlateEditor>, 'plugins'> & {
    plugins?: PlatePlugin[];
};
export declare const createPlateEditor: (options?: CreatePlateEditorOptions) => PlateEditor & Omit<s.BaseEditor, "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid" | "id"> & {
    id: any;
    children: Value;
    operations: p.TOperation<p.TDescendant>[];
    marks: Record<string, any> | null;
    isInline: <N extends p.TElement>(element: N) => boolean;
    isVoid: <N_1 extends p.TElement>(element: N_1) => boolean;
    markableVoid: <N_2 extends p.TElement>(element: N_2) => boolean;
    normalizeNode: <N_3 extends p.TNode>(entry: p.TNodeEntry<N_3>) => void;
    apply: <N_4 extends p.TDescendant>(operation: p.TOperation<N_4>) => void;
    getFragment: <N_5 extends p.TDescendant>() => N_5[];
    insertFragment: <N_6 extends p.TDescendant>(fragment: N_6[]) => void;
    insertNode: <N_7 extends p.TDescendant>(node: N_7) => void;
    getDirtyPaths: <N_8 extends p.TDescendant>(operation: p.TOperation<N_8>) => s.Path[];
} & p.UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "insertTextData" | "setFragmentData" | "hasRange" | "hasTarget" | "hasEditableTarget" | "hasSelectableTarget" | "isTargetInsideNonReadonlyVoid"> & p.PlateEditorMethods<Value> & {
    key: any;
    plugins: p.WithPlatePlugin<{}, Value, p.PlateEditor<Value>>[];
    pluginsByKey: Record<string, p.WithPlatePlugin<{}, Value, p.PlateEditor<Value>>>;
    prevSelection: s.BaseRange | null;
    blockFactory: (node?: Partial<p.TElement> | undefined, path?: s.Path | undefined) => p.TElement;
    childrenFactory: () => Value;
    isFallback: boolean;
    currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
};
/**
 * The only reason for this helper to exist is to run the initial normalization
 * before mounting the Plate editor component which in turn avoids the false
 * trigger of `onChange`.
 *
 * Background:
 *
 * Due to legacy behavior, it's possible to have "valid" RT document (based on
 * the schema from rich-text-types) that doesn't make sense. For example, links
 * with no text nodes?[1]. Solving that requires an initial normalization pass
 * which modifies the slate tree by definition -> triggering onChange.
 *
 * The initial onChange trigger is undesirable as the user may not have touched
 * the RT content yet or the editor is rendered as readonly.
 *
 * Ideally, we should not initialize the editor twice but that's the only
 * way that I could get this to work. Improvements are welcome.
 *
 * [1]: See cypress/e2e/rich-text/.../invalidDocumentNormalizable.js for more
 *      examples.
 */
export declare const normalizeInitialValue: (options: CreatePlateEditorOptions, initialValue?: Value) => Value;
export declare const focusEditor: (editor: PlateEditor, target?: Location) => void;
export declare const blurEditor: (editor: PlateEditor) => void;
export declare const selectEditor: (editor: PlateEditor, opts: p.SelectEditorOptions) => void;
export declare const fromDOMPoint: (editor: PlateEditor, domPoint: [Node, number], opts?: {
    exactMatch: boolean;
    suppressThrow: boolean;
}) => s.BasePoint | null | undefined;
export declare const mockPlugin: (plugin?: Partial<PlatePlugin> | undefined) => p.WithPlatePlugin<p.AnyObject, p.Value, p.PlateEditor<p.Value>>;
