'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _reactRouterRedux = require('react-router-redux');

var _selectors = require('redux-auth/lib/containers/AuthenticationProvider/selectors');

var UserIsAuthenticated = (0, _reduxAuthWrapper.UserAuthWrapper)({
  authSelector: (0, _selectors.makeSelectUser)(),
  redirectAction: _reactRouterRedux.routerActions.replace,
  failureRedirectPath: '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated'
});
// TODO: move it to redux-auth
exports.default = UserIsAuthenticated;