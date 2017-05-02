import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
// TODO: move it to redux-auth
import { selectUser } from 'redux-auth/lib/containers/AuthenticationProvider/selectors';

const UserIsAdmin = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isAdmin,
  redirectAction: routerActions.replace,
  // TODO: move url of default homepage/dashboard to the config file
  failureRedirectPath: '/home',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin',
});

function isAdmin(user) {
  return user && user.role === '20_example_admin';
}

export default UserIsAdmin;

