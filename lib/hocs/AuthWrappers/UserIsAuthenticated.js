'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _reactRouterRedux = require('react-router-redux');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var UserIsAuthenticated = (0, _reduxAuthWrapper.UserAuthWrapper)({
  authSelector: _selectors.selectUser,
  redirectAction: _reactRouterRedux.routerActions.replace,
  failureRedirectPath: '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated'
});

exports.default = UserIsAuthenticated;