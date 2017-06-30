import _isString from 'lodash/isString';
import config from '../../config';
import creactUserIsNotAuthenticatedAuthWrapper from './creactUserIsNotAuthenticatedAuthWrapper';

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

export default UserIsNotAuthenticated;
