'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  userIsNotAuthenticatedRedirectPath: '/sign-in',
  userIsNotAdminRedirectPath: '/',
  userHasNoRoleRedirectPath: '/',
  userIsAuthenticatedRedirectPath: '/',
  redirectPathAfterSignOut: '/sign-in',
  signInConfirmCodePageUrl: '/sign-in-confirm-code',
  adminRole: '20_example_admin',
  camelizeUserDataKeys: true,
  reactRouterVersion: 3,
  autoSignOutWithin: false,
  signInAuthWrapper: undefined,
  signUpAuthWrapper: undefined,
  recaptchaSiteKey: undefined,
  successAuthenticationResponseSaga: undefined,
  failedAuthenticationResponseSaga: undefined
};

var setConfig = exports.setConfig = function setConfig(newConfig) {
  Object.assign(config, newConfig);
};

exports.default = config;