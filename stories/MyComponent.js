import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { IntlProvider } from 'react-intl';
import SignUpForm from '../src/components/SignUpForm';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

storiesOf('SignUpForm', module)
  .add('without text prop', () => (
    <Provider store={store}>
      <IntlProvider locale="en">
        <SignUpForm />
      </IntlProvider>
    </Provider>
  ));
