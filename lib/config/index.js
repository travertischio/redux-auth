'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConfig = undefined;

var _creactUserIsNotAuthenticatedAuthWrapper = require('../hocs/AuthWrappers/creactUserIsNotAuthenticatedAuthWrapper');

var _creactUserIsNotAuthenticatedAuthWrapper2 = _interopRequireDefault(_creactUserIsNotAuthenticatedAuthWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  userIsNotAuthenticatedRedirectPath: '/sign-in',
  userIsNotAdminRedirectPath: '/',
  userHasNoRoleRedirectPath: '/',
  userIsAuthenticatedRedirectPath: '/',
  redirectPathAfterSignIn: '/',
  redirectPathAfterSignUp: '/',
  redirectPathAfterSignOut: '/sign-in',
  adminRole: '20_example_admin',
  camelizeUserDataKeys: false
};

config.signInAuthWrapper = (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(config.redirectPathAfterSignIn);
config.signUpAuthWrapper = (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(config.redirectPathAfterSignUp);

var setConfig = exports.setConfig = function setConfig(newConfig) {
  Object.assign(config, newConfig);

  if (newConfig.redirectPathAfterSignIn) {
    updateSignInAuthWrapper();
  }

  if (newConfig.redirectPathAfterSignUp) {
    updateSignUpAuthWrapper();
  }
};

function updateSignInAuthWrapper() {
  config.signInAuthWrapper = (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(config.redirectPathAfterSignIn);
}

function updateSignUpAuthWrapper() {
  config.signUpAuthWrapper = (0, _creactUserIsNotAuthenticatedAuthWrapper2.default)(config.redirectPathAfterSignUp);
}

updateSignInAuthWrapper();
updateSignUpAuthWrapper();

exports.default = config;