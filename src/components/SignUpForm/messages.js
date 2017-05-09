/*
 * SignUp Messages
 *
 * This contains all the text for the SignUp component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  firstName: {
    id: 'app.components.SignIn.form.firstName',
    defaultMessage: 'Name',
  },
  email: {
    id: 'app.components.SignIn.form.email',
    defaultMessage: 'E-mail',
  },
  password: {
    id: 'app.components.SignIn.form.password',
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: 'app.components.SignIn.form.confirmPassword',
    defaultMessage: 'Repeat password',
  },
});
