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

var UserIsAdmin = (0, _connectedReduxRedirect["default"])({
  authenticatedSelector: isAdminSelector,
  redirectAction: _actions.redirectActionWithSupportParamInQueryString,
  redirectPath: function redirectPath() {
    return _config["default"].userIsNotAdminRedirectPath;
  },
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin'
});

function isAdminSelector(state) {
  var user = (0, _selectors.selectUser)(state);
  return user && user.role === _config["default"].adminRole;
}

var _default = UserIsAdmin;
exports["default"] = _default;