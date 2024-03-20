"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ListOL: function() {
        return ListOL;
    },
    ListUL: function() {
        return ListUL;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _f36tokens = _interop_require_default(require("@contentful/f36-tokens"));
const _richtexttypes = require("@contentful/rich-text-types");
const _emotion = require("emotion");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const baseStyle = (0, _emotion.css)`
  padding: 0;
  margin: 0 0 1.25rem 1.25rem;

  div:first-child {
    margin: 0;
    line-height: ${_f36tokens.default.lineHeightDefault};
  }
`;
const styles = {
    [_richtexttypes.BLOCKS.UL_LIST]: (0, _emotion.css)`
    list-style-type: disc;
    ul {
      list-style-type: circle;
      ul {
        list-style-type: square;
      }
    }
  `,
    [_richtexttypes.BLOCKS.OL_LIST]: (0, _emotion.css)`
    list-style-type: decimal;
    ol {
      list-style-type: upper-alpha;
      ol {
        list-style-type: lower-roman;
        ol {
          list-style-type: lower-alpha;
        }
      }
    }
  `
};
function createList(Tag, block) {
    return function List(props) {
        return _react.createElement(Tag, {
            ...props.attributes,
            className: (0, _emotion.cx)(baseStyle, styles[block])
        }, props.children);
    };
}
const ListUL = createList('ul', _richtexttypes.BLOCKS.UL_LIST);
const ListOL = createList('ol', _richtexttypes.BLOCKS.OL_LIST);
