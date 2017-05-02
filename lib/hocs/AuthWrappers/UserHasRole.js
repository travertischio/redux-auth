'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _reactRouterRedux = require('react-router-redux');

var _selectors = require('redux-auth/lib/containers/AuthenticationProvider/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserHasRole = function UserHasRole(expectedRoles) {
  return (0, _reduxAuthWrapper.UserAuthWrapper)({
    authSelector: _selectors.selectUser,
    predicate: getUserHasOfEpectedRoleFn(expectedRoles),
    redirectAction: _reactRouterRedux.routerActions.replace,
    // TODO: move url of default homepage/dashboard to the config file
    failureRedirectPath: '/home',
    allowRedirectBack: false,
    wrapperDisplayName: 'UserHasRole'
  });
};

function getUserHasOfEpectedRoleFn(expectedRoles) {
  return function (user) {
    return user && (0, _includes3.default)(expectedRoles, user.role);
  };
}

exports.default = UserHasRole;