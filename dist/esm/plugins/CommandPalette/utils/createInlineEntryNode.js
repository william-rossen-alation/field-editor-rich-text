import { INLINES } from '@contentful/rich-text-types';
export function createInlineEntryNode(id) {
    return {
        type: INLINES.EMBEDDED_ENTRY,
        children: [
            {
                text: ''
            }
        ],
        data: {
            target: {
                sys: {
                    id,
                    type: 'Link',
                    linkType: 'Entry'
                }
            }
        }
    };
}
