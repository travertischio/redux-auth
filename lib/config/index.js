'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  userIsNotAuthenticatedRedirectPath: '/sign-in',
  userIsNotAdminRedirectPath: '/',
  userHasNoRoleRedirectPath: '/',
  userIsAuthenticatedRedirectPath: '/',
  redirectPathAfterSignIn: '/',
  redirectPathAfterSignUp: '/',
  redirectPathAfterSignOut: '/sign-in',
  signInConfirmCodePageUrl: '/sign-in-confirm-code',
  adminRole: '20_example_admin',
  camelizeUserDataKeys: true,
  reactRouterVersion: 3,
  autoSignOutWithin: false
};

var setConfig = exports.setConfig = function setConfig(newConfig) {
  Object.assign(config, newConfig);

  // if (newConfig.redirectPathAfterSignIn) {
  //   updateSignInAuthWrapper();
  // }

  // if (newConfig.redirectPathAfterSignUp) {
  //   updateSignUpAuthWrapper();
  // }
};

// function updateSignInAuthWrapper() {
//   config.signInAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignIn);
// }

// function updateSignUpAuthWrapper() {
//   config.signUpAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignUp);
// }

// updateSignInAuthWrapper();
// updateSignUpAuthWrapper();

exports.default = config;