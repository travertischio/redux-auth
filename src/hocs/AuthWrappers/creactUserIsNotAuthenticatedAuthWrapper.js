import { UserAuthWrapper } from 'redux-auth-wrapper';
import { selectUser } from '../../containers/AuthenticationProvider/selectors';
import { redirectActionWithSupportParamInQueryString } from '../../containers/AuthenticationProvider/actions';

function creactUserIsNotAuthenticatedAuthWrapper(failureRedirectPath) {
  return UserAuthWrapper({
    authSelector: selectUser,
    predicate: isNotAuthenticated,
    redirectAction: redirectActionWithSupportParamInQueryString,
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    failureRedirectPath,
  });
}

function isNotAuthenticated(user) {
  return !user;
}

export default creactUserIsNotAuthenticatedAuthWrapper;
