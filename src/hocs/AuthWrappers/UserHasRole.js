import _includes from 'lodash/includes';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';

const UserHasRole = (expectedRoles) => UserAuthWrapper({
  authSelector: selectUser,
  predicate: getUserHasOfEpectedRoleFn(expectedRoles),
  redirectAction: routerActions.replace,
  // TODO: move url of default homepage/dashboard to the config file
  failureRedirectPath: '/home',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserHasRole',
});

function getUserHasOfEpectedRoleFn(expectedRoles) {
  return (user) => user && _includes(expectedRoles, user.role);
}

export default UserHasRole;

