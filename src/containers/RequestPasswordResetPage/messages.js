/*
 * RequestPasswordResetPage Messages
 *
 * This contains all the text for the RequestPasswordResetPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  pageTitle: {
    id: 'app.containers.RequestPasswordResetPage.pageTitle',
    defaultMessage: 'Password Change',
  },
  pageDescription: {
    id: 'app.containers.RequestPasswordResetPage.pageDescription',
    defaultMessage: 'Password Change',
  },
  header: {
    id: 'app.containers.RequestPasswordResetPage.header',
    defaultMessage: 'Let’s find your account',
  },
  successHeader: {
    id: 'app.containers.RequestPasswordResetPage.successHeader',
    defaultMessage: 'We just emailed you a link',
  },
  successMessage: {
    id: 'app.containers.RequestPasswordResetPage.successMessage',
    defaultMessage: 'Please check your email and click the secure link.',
  },
  successMessageSpamTip: {
    id: 'app.containers.RequestPasswordResetPage.successMessageSpamTip',
    defaultMessage: 'If you don’t see our email, check your spam folder. Still having trouble? Get troubleshooting tips.',
  },
  serverErrorUnknown: {
    id: 'app.containers.RequestPasswordResetPage.serverErrorUnknown',
    defaultMessage: 'An error occurred during sending request password rest. Please try again.',
  },
});
