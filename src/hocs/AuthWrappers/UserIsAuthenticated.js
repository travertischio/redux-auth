import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: selectUser,
  redirectAction: routerActions.replace,
  failureRedirectPath: config.userIsNotAuthenticatedRedirectPath,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default UserIsAuthenticated;
