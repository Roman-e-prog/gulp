Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=_interopRequireDefault(require("react")),_reactRouterDom=require("react-router-dom"),_Home=_interopRequireDefault(require("./pages/home/Home"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var App=function(){return _react.default.createElement("div",null,_react.default.createElement(_reactRouterDom.BrowserRouter,null,_react.default.createElement(_reactRouterDom.Routes,null,_react.default.createElement(_reactRouterDom.Route,{path:"/",element:_react.default.createElement(_Home.default,null)}))))},_default=exports.default=App;