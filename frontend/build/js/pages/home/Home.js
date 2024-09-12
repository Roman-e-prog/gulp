function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=_interopRequireDefault(require("react")),styles=_interopRequireWildcard(require("./home.module.css")),_Navbar=_interopRequireDefault(require("../../components/navbar/Navbar")),_Output=_interopRequireDefault(require("../../components/output/Output")),_Entry=_interopRequireDefault(require("../../components/entry/Entry"));function _getRequireWildcardCache(e){var t,r;return"function"!=typeof WeakMap?null:(t=new WeakMap,r=new WeakMap,(_getRequireWildcardCache=function(e){return e?r:t})(e))}function _interopRequireWildcard(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=_typeof(e)&&"function"!=typeof e)return{default:e};t=_getRequireWildcardCache(t);if(t&&t.has(e))return t.get(e);var r,u,n={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(r in e)"default"!==r&&{}.hasOwnProperty.call(e,r)&&((u=o?Object.getOwnPropertyDescriptor(e,r):null)&&(u.get||u.set)?Object.defineProperty(n,r,u):n[r]=e[r]);return n.default=e,t&&t.set(e,n),n}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Home=function(){return _react.default.createElement("div",{className:styles.container},_react.default.createElement(_Navbar.default,null),_react.default.createElement("div",{className:styles.body},_react.default.createElement(_Entry.default,null),_react.default.createElement(_Output.default,null)))},_default=exports.default=Home;