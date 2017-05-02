'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _reactRouterRedux = require('react-router-redux');

var _selectors = require('redux-auth/lib/containers/AuthenticationProvider/selectors');

var UserIsAdmin = (0, _reduxAuthWrapper.UserAuthWrapper)({
  authSelector: _selectors.selectUser,
  predicate: isAdmin,
  redirectAction: _reactRouterRedux.routerActions.replace,
  // TODO: move url of default homepage/dashboard to the config file
  failureRedirectPath: '/home',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin'
});
// TODO: move it to redux-auth


function isAdmin(user) {
  return user && user.role === '20_example_admin';
}

exports.default = UserIsAdmin;