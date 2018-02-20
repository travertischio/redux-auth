import { redirectActionWithSupportParamInQueryString } from '~/containers/AuthenticationProvider/actions';
import { selectUser } from '~/containers/AuthenticationProvider/selectors';
import config from '~/config';
import connectedReduxRedirect from './connectedReduxRedirect';

const UserHasRole = (expectedRoles) => connectedReduxRedirect({
  authenticatedSelector: makeUserHasOfEpectedRoleSelector(expectedRoles),
  redirectAction: redirectActionWithSupportParamInQueryString,
  redirectPath: () => config.userHasNoRoleRedirectPath,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserHasRole',
});

function makeUserHasOfEpectedRoleSelector(expectedRoles) {
  return (state) => {
    const user = selectUser(state);

    return user && expectedRoles.includes(user.role);
  };
}

export default UserHasRole;
