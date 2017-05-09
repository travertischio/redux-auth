import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlProvider } from 'react-intl';

import SignUpForm from '../src/components/SignUpForm';
import SignInForm from '../src/components/SignInForm';
import RequestPasswordResetForm from '../src/components/RequestPasswordResetForm';
import ResetPasswordForm from '../src/components/ResetPasswordForm';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

storiesOf('SignUpForm', module)
  .add('basic form', () => wrapWithProviders(
    <SignUpForm handleSubmit={handleSubmit} />
  ));

storiesOf('SignInForm', module)
  .add('basic form', () => wrapWithProviders(
    <SignInForm handleSubmit={handleSubmit} />
  ));

storiesOf('RequestPasswordResetForm', module)
  .add('basic form', () => wrapWithProviders(
    <RequestPasswordResetForm handleSubmit={handleSubmit} />
  ));

storiesOf('ResetPasswordForm', module)
  .add('basic form', () => wrapWithProviders(
    <ResetPasswordForm handleSubmit={handleSubmit} />
  ));

function wrapWithProviders(jsx) {
  return (
    <Provider store={store}>
      <IntlProvider locale="en">
        {jsx}
      </IntlProvider>
    </Provider>
  );
}

function handleSubmit() {
  alert('It works!');
}
