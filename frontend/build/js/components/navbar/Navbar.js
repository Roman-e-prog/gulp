function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=_interopRequireDefault(require("react")),styles=_interopRequireWildcard(require("./navbar.module.css"));function _getRequireWildcardCache(e){var t,r;return"function"!=typeof WeakMap?null:(t=new WeakMap,r=new WeakMap,(_getRequireWildcardCache=function(e){return e?r:t})(e))}function _interopRequireWildcard(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=_typeof(e)&&"function"!=typeof e)return{default:e};t=_getRequireWildcardCache(t);if(t&&t.has(e))return t.get(e);var r,o,n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(r in e)"default"!==r&&{}.hasOwnProperty.call(e,r)&&((o=a?Object.getOwnPropertyDescriptor(e,r):null)&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]);return n.default=e,t&&t.set(e,n),n}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Navbar=function(){return _react.default.createElement("div",{className:styles.container},_react.default.createElement("h1",{className:styles.title,"data-testid":"title"},"Short test of Gulp with Webpack"))},_default=exports.default=Navbar;