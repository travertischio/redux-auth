const config = {
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
};

export const setConfig = (newConfig) => {
  Object.assign(config, newConfig);
};

export default config;
