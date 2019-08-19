"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("../../containers/AuthenticationProvider/actions");

var _selectors = require("../../containers/AuthenticationProvider/selectors");

var _config = _interopRequireDefault(require("../../config"));

var _connectedReduxRedirect = _interopRequireDefault(require("./connectedReduxRedirect"));

var _default = (0, _connectedReduxRedirect["default"])({
  authenticatedSelector: _selectors.selectTokeDataExists,
  redirectAction: _actions.redirectActionWithSupportParamInQueryString,
  redirectPath: function redirectPath() {
    return _config["default"].userIsNotAuthenticatedRedirectPath;
  },
  wrapperDisplayName: 'TokeDataExists'
});

exports["default"] = _default;