import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlProvider } from 'react-intl';

import SignUpForm from '../src/components/SignUpForm';
import SignInForm from '../src/components/SignInForm';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

storiesOf('SignUpForm', module)
  .add('without text prop', () => wrapWithProviders(
    <SignUpForm />
  ));

storiesOf('SignInForm', module)
  .add('without text prop', () => wrapWithProviders(
    <SignInForm />
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
