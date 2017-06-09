'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = { // eslint-disable-line import/no-mutable-exports
  userIsNotAuthenticatedRedirectPath: '/sign-in',
  userIsNotAdminRedirectPath: '/',
  userHasNoRoleRedirectPath: '/',
  userIsAuthenticatedRedirectPath: '/',
  redirectPathAfterSignIn: '/',
  redirectPathAfterSignUp: '/',
  redirectPathAfterSignOut: '/sign-in',
  adminRole: '20_example_admin'
};

var setConfig = exports.setConfig = function setConfig(newConfig) {
  config = Object.assign(config, newConfig);
};

exports.default = config;