"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Cell", {
    enumerable: true,
    get: function() {
        return Cell;
    }
});
const _react = _interop_require_wildcard(require("react"));
const _f36tokens = _interop_require_default(require("@contentful/f36-tokens"));
const _emotion = require("emotion");
const _slatereact = require("slate-react");
const _TableActions = require("./TableActions");
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
const style = (0, _emotion.css)`
  border: 1px solid ${_f36tokens.default.gray400};
  border-collapse: collapse;
  padding: 10px 12px;
  min-width: 48px;
  position: relative;
  vertical-align: top;

  div:last-child {
    margin-bottom: 0;
  }
`;
const Cell = (props)=>{
    const isSelected = (0, _slatereact.useSelected)();
    return _react.createElement("td", {
        ...props.attributes,
        ...props.element.data,
        className: style
    }, isSelected && _react.createElement(_TableActions.TableActions, null), props.children);
};
