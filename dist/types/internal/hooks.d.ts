import * as p from '@udecode/plate-common';
import { PlateEditor } from './types';
export declare const useReadOnly: () => boolean;
export declare const usePlateEditorRef: (id?: string) => PlateEditor;
export declare const usePlateEditorState: (id?: string) => PlateEditor;
export declare const usePlateSelectors: (id?: string) => {
    id: (options?: string | import("jotai-x").UseAtomOptions | undefined) => string;
    editor: (options?: string | import("jotai-x").UseAtomOptions | undefined) => p.PlateEditor<p.Value>;
    rawPlugins: (options?: string | import("jotai-x").UseAtomOptions | undefined) => p.PlatePlugin<p.AnyObject, p.Value, p.PlateEditor<p.Value>>[];
    plugins: (options?: string | import("jotai-x").UseAtomOptions | undefined) => p.WithPlatePlugin<p.AnyObject, p.Value, p.PlateEditor<p.Value>>[];
    value: (options?: string | import("jotai-x").UseAtomOptions | undefined) => p.Value;
    isMounted: (options?: string | import("jotai-x").UseAtomOptions | undefined) => boolean | null;
    readOnly: (options?: string | import("jotai-x").UseAtomOptions | undefined) => boolean | null;
    primary: (options?: string | import("jotai-x").UseAtomOptions | undefined) => boolean | null;
    versionEditor: (options?: string | import("jotai-x").UseAtomOptions | undefined) => number | null;
    versionSelection: (options?: string | import("jotai-x").UseAtomOptions | undefined) => number | null;
    versionDecorate: (options?: string | import("jotai-x").UseAtomOptions | undefined) => number | null;
    onChange: (options?: string | import("jotai-x").UseAtomOptions | undefined) => ((value: p.Value) => void) | null;
    editorRef: (options?: string | import("jotai-x").UseAtomOptions | undefined) => React__default.ForwardedRef<p.PlateEditor<p.Value>>;
    decorate: (options?: string | import("jotai-x").UseAtomOptions | undefined) => ((entry: p.TNodeEntry) => import("slate").BaseRange[]) | null;
    renderElement: (options?: string | import("jotai-x").UseAtomOptions | undefined) => p.RenderElementFn | null;
    renderLeaf: (options?: string | import("jotai-x").UseAtomOptions | undefined) => p.RenderLeafFn | null;
    trackedEditor: (options?: string | import("jotai-x").UseAtomOptions | undefined) => {
        editor: any;
        version: number | null;
    };
    trackedSelection: (options?: string | import("jotai-x").UseAtomOptions | undefined) => {
        selection: any;
        version: number | null;
    };
} & {
    atom: <V>(atom: import("jotai").Atom<V>, options?: string | import("jotai-x").UseAtomOptions | undefined) => V;
};
