import creactUserIsNotAuthenticatedAuthWrapper from '../hocs/AuthWrappers/creactUserIsNotAuthenticatedAuthWrapper';

const config = {
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
};

config.signInAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignIn);
config.signUpAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignUp);

export const setConfig = (newConfig) => {
  Object.assign(config, newConfig);

  if (newConfig.redirectPathAfterSignIn) {
    updateSignInAuthWrapper();
  }

  if (newConfig.redirectPathAfterSignUp) {
    updateSignUpAuthWrapper();
  }
};

function updateSignInAuthWrapper() {
  config.signInAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignIn);
}

function updateSignUpAuthWrapper() {
  config.signUpAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignUp);
}

updateSignInAuthWrapper();
updateSignUpAuthWrapper();

export default config;
