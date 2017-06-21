'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAuthWrapper = require('redux-auth-wrapper');

var _reactRouterRedux = require('react-router-redux');

var _selectors = require('../AuthenticationProvider/selectors');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignUpForNotAuthenticatedUsers = (0, _reduxAuthWrapper.UserAuthWrapper)({
  authSelector: _selectors.selectUser,
  predicate: isNotAuthenticated,
  redirectAction: _reactRouterRedux.routerActions.replace,
  failureRedirectPath: _config2.default.redirectPathAfterSignIn,
  allowRedirectBack: false,
  wrapperDisplayName: 'SignUpForNotAuthenticatedUsers'
});

function isNotAuthenticated(user) {
  return !user;
}

exports.default = SignUpForNotAuthenticatedUsers;