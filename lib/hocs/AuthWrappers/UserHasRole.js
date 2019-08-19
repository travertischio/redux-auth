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

var UserHasRole = function UserHasRole(expectedRoles) {
  return (0, _connectedReduxRedirect["default"])({
    authenticatedSelector: makeUserHasOfEpectedRoleSelector(expectedRoles),
    redirectAction: _actions.redirectActionWithSupportParamInQueryString,
    redirectPath: function redirectPath() {
      return _config["default"].userHasNoRoleRedirectPath;
    },
    allowRedirectBack: false,
    wrapperDisplayName: 'UserHasRole'
  });
};

function makeUserHasOfEpectedRoleSelector(expectedRoles) {
  return function (state) {
    var user = (0, _selectors.selectUser)(state);
    return user && expectedRoles.includes(user.role);
  };
}

var _default = UserHasRole;
exports["default"] = _default;