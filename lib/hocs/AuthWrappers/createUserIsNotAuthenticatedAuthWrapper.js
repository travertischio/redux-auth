"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = require("../../containers/AuthenticationProvider/selectors");

var _actions = require("../../containers/AuthenticationProvider/actions");

var _connectedReduxRedirect = _interopRequireDefault(require("./connectedReduxRedirect"));

function createUserIsNotAuthenticatedAuthWrapper(redirectPath) {
  return (0, _connectedReduxRedirect["default"])({
    authenticatedSelector: isNotAuthenticatedSelector,
    redirectAction: _actions.redirectActionWithSupportParamInQueryString,
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: redirectPath
  });
}

function isNotAuthenticatedSelector(state) {
  var isAuthenticated = (0, _selectors.selectIsAuthenticated)(state);
  return !isAuthenticated;
}

var _default = createUserIsNotAuthenticatedAuthWrapper;
exports["default"] = _default;