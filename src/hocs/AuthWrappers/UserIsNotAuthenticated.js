import UserIsNotAuthenticatedWithCustomRedirect from './UserIsNotAuthenticatedWithCustomRedirect';
import config from '../../config';

export default UserIsNotAuthenticatedWithCustomRedirect(config.userIsAuthenticatedRedirectPath);
