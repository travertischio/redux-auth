import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: selectUser,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/sign-in',
  wrapperDisplayName: 'UserIsAuthenticated',
});


export default UserIsAuthenticated;
