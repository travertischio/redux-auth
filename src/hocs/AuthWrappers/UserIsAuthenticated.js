import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
// TODO: move it to redux-auth
import { makeSelectUser } from 'redux-auth/lib/containers/AuthenticationProvider/selectors';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: makeSelectUser(),
  redirectAction: routerActions.replace,
  failureRedirectPath: '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated',
});


export default UserIsAuthenticated;
