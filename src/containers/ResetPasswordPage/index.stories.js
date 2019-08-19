import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ResetPasswordPage from '.';

const resetPasswordToken = 'MQ-NG5uLTI5Yjc3ZGZjZTM3NTQ2YTI5YTY3';

storiesOf('Reset Password Page', module)
  .add('with valid token', () => (
    <ResetPasswordPage
      isAuthenticated
      routeParams={{ resetPasswordToken }}
    />
  ))
  .add('with invalid token', () => (
    <ResetPasswordPage
      isAuthenticated={false}
      routeParams={{ resetPasswordToken: 'NOT_VALID_TOKEN' }}
    />
  ));
