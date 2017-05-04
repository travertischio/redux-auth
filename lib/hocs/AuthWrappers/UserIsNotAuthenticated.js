'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _reactRouterRedux = require('react-router-redux');

var _selectors = require('../../containers/AuthenticationProvider/selectors');

var UserIsNotAuthenticated = (0, _reduxAuthWrapper.UserAuthWrapper)({
  authSelector: _selectors.selectUser,
  predicate: isNotAuthenticated,
  redirectAction: _reactRouterRedux.routerActions.replace,
  // TODO: move url of default homepage/dashboard to the config file
  failureRedirectPath: '/home',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});

function isNotAuthenticated(user) {
  return !user;
}

exports.default = UserIsNotAuthenticated;