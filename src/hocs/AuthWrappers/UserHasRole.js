import _includes from 'lodash/includes';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserHasRole = (expectedRoles) => connectedReduxRedirect({
  authenticatedSelector: makeUserHasOfEpectedRoleSelector(expectedRoles),
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: config.userHasNoRoleRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserHasRole',
});

function makeUserHasOfEpectedRoleSelector(expectedRoles) {
  return (state) => {
    const user = selectUser(state);

    return user && _includes(expectedRoles, user.role);
  };
}

export default UserHasRole;

