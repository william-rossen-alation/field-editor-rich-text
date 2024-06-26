import { createBoldPlugin } from './Bold';
import { createCodePlugin } from './Code';
import { createItalicPlugin } from './Italic';
import { createSubscriptPlugin } from './Subscript';
import { createSuperscriptPlugin } from './Superscript';
import { createUnderlinePlugin } from './Underline';
export const createMarksPlugin = ()=>({
        key: 'Marks',
        plugins: [
            createBoldPlugin(),
            createCodePlugin(),
            createItalicPlugin(),
            createUnderlinePlugin(),
            createSuperscriptPlugin(),
            createSubscriptPlugin()
        ]
    });
