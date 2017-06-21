import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';

const UserIsNotAuthenticated = (failureRedirectPath) => UserAuthWrapper({
  authSelector: selectUser,
  predicate: isNotAuthenticated,
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  failureRedirectPath,
});

function isNotAuthenticated(user) {
  return !user;
}

export default UserIsNotAuthenticated;
