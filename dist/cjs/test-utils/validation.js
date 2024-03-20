"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRichTextDocument", {
    enumerable: true,
    get: function() {
        return validateRichTextDocument;
    }
});
const _richtexttypes = require("@contentful/rich-text-types");
const _schemas = require("@contentful/rich-text-types/dist/schemas");
const _ajv = _interop_require_default(require("ajv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ajv = new _ajv.default({
    allErrors: true,
    verbose: true
});
function validateRichTextDocument(document) {
    const validateRootNode = getValidator(_richtexttypes.BLOCKS.DOCUMENT);
    const rootNodeIsValid = validateRootNode(removeGrandChildNodes(document));
    const errors = [];
    if (rootNodeIsValid) {
        validateChildNodes(document, [
            'content'
        ], errors);
    } else {
        buildSchemaErrors(validateRootNode, [], errors);
    }
    return errors;
}
function validateChildNodes(node, path, errors) {
    for(let i = 0; i < node.content.length; i++){
        validateNode(node.content[i], [
            ...path,
            i
        ], errors);
    }
}
function validateNode(node, path, errors) {
    const validateSchema = getValidator(node.nodeType);
    const isValid = validateSchema(removeGrandChildNodes(resetChildNodes(node)));
    if (!isValid) {
        buildSchemaErrors(validateSchema, path, errors);
        return;
    }
    if (!isLeafNode(node)) {
        validateChildNodes(node, [
            ...path,
            'content'
        ], errors);
    }
}
function getValidator(nodeType) {
    const schema = (0, _schemas.getSchemaWithNodeType)(nodeType);
    const validate = ajv.compile(schema);
    const validator = (data)=>{
        validate(data);
        validator.errors = removeGrandChildrenMinItemsErrors(validate.errors ?? []);
        return validator.errors.length === 0;
    };
    return validator;
}
function buildSchemaErrors(validateSchema, _, errors) {
    const schemaErrors = validateSchema.errors;
    const constraintError = schemaErrors.find((e)=>e.keyword === 'enum' || e.keyword === 'anyOf');
    if (constraintError) {
        errors.push(constraintError);
        return;
    }
    errors.push(...schemaErrors);
}
function resetChildNodes(node) {
    const { content } = node;
    if (isLeafNode(node)) {
        return node;
    }
    return Object.assign({}, node, {
        content: content.map(resetNode)
    });
}
function resetNode(node) {
    const { nodeType } = node;
    if (_richtexttypes.helpers.isText(node)) {
        return {
            nodeType,
            data: {},
            value: '',
            marks: []
        };
    }
    return {
        nodeType,
        data: {},
        content: []
    };
}
function removeGrandChildNodes(node) {
    const { content } = node;
    if (isLeafNode(node)) {
        return node;
    }
    return Object.assign({}, node, {
        content: content.map(removeChildNodes)
    });
}
function removeChildNodes(node) {
    if (_richtexttypes.helpers.isText(node)) {
        return node;
    }
    return Object.assign({}, node, {
        content: []
    });
}
function isLeafNode(node) {
    return _richtexttypes.helpers.isText(node) || !Array.isArray(node.content);
}
function removeGrandChildrenMinItemsErrors(errors) {
    return errors.filter((error)=>{
        const level = error.instancePath.split('/').length;
        return !(level > 3 && error.keyword === 'minItems');
    });
}
