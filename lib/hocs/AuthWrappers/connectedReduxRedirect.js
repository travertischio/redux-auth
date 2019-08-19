"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "connectedReduxRedirectV3", {
  enumerable: true,
  get: function get() {
    return _redirect.connectedReduxRedirect;
  }
});
Object.defineProperty(exports, "connectedReduxRedirectV4", {
  enumerable: true,
  get: function get() {
    return _redirect2.connectedReduxRedirect;
  }
});
exports["default"] = void 0;

var _redirect = require("redux-auth-wrapper/history3/redirect");

var _redirect2 = require("redux-auth-wrapper/history4/redirect");

var _config = _interopRequireDefault(require("../../config"));

var connectedReduxRedirect = _config["default"].reactRouterVersion === 3 ? _redirect.connectedReduxRedirect : _redirect2.connectedReduxRedirect;
var _default = connectedReduxRedirect;
exports["default"] = _default;