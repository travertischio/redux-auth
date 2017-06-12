import _includes from 'lodash/includes';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserHasRole = (expectedRoles) => UserAuthWrapper({
  authSelector: selectUser,
  predicate: getUserHasOfEpectedRoleFn(expectedRoles),
  redirectAction: routerActions.replace,
  failureRedirectPath: config.userHasNoRoleRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserHasRole',
});

function getUserHasOfEpectedRoleFn(expectedRoles) {
  return (user) => user && _includes(expectedRoles, user.role);
}

export default UserHasRole;

