import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import _isString from 'lodash/isString';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import config from '../../config';

const UserIsNotAuthenticated = (failureRedirectPathOrPageComponent) => {
  // It is possible to use this wrapper in two ways:
  // 1st: With passing to it failure redirect path:
  // UserIsNotAuthenticated('/take-me-here')(PageComponent)
  // or:
  // @UserIsNotAuthenticated('/take-me-here')
  // PageComponent
  if (_isString(failureRedirectPathOrPageComponent)) {
    const failureRedirectPath = failureRedirectPathOrPageComponent;
    return creactUserIsNotAuthenticatedAuthWrapper(failureRedirectPath);
  }

  // 2nd.: Without passing explicit failure redirect path, but directly page component:
  // UserIsNotAuthenticated(PageComponent)
  // or:
  // @UserIsNotAuthenticated
  // PageComponent
  const failureRedirectPath = config.userIsAuthenticatedRedirectPath;
  const authWrapper = creactUserIsNotAuthenticatedAuthWrapper(failureRedirectPath);
  const pageComponent = failureRedirectPathOrPageComponent;
  return authWrapper(pageComponent);
};

function creactUserIsNotAuthenticatedAuthWrapper(failureRedirectPath) {
  return UserAuthWrapper({
    authSelector: selectUser,
    predicate: isNotAuthenticated,
    redirectAction: routerActions.replace,
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    failureRedirectPath,
  });
}

function isNotAuthenticated(user) {
  return !user;
}

export default UserIsNotAuthenticated;
