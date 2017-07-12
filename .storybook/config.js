import React from 'react';
import PropTypes from 'prop-types';
import 'babel-polyfill';
import { fromJS } from 'immutable';
import {
  configure,
  addDecorator,
} from '@kadira/storybook';
import { IntlProvider } from 'react-intl';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';
import {
  Provider,
  connect,
} from 'react-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { setBaseUrl } from 'api-client';
import { createStructuredSelector } from 'reselect';
import {
  AuthenticationProvider,
  reducer as authReducer,
  sagas as authSagas,
  selectIsAuthenticated,
} from '../src/index';
import signInPageReducer from '../src/containers/SignInPage/reducer';
import signInPageSagas from '../src/containers/SignInPage/sagas';
import signUpPageReducer from '../src/containers/SignUpPage/reducer';
import signUpPageSagas from '../src/containers/SignUpPage/sagas';
import resetPasswordPageReducer from '../src/containers/ResetPasswordPage/reducer';
import resetPasswordPageSagas from '../src/containers/ResetPasswordPage/sagas';
import requestPasswordResetPageReducer from '../src/containers/RequestPasswordResetPage/reducer';
import requestPasswordResetPageSagas from '../src/containers/RequestPasswordResetPage/sagas';
import signOutPageSagas from '../src/containers/SignOutPage/sagas';

setBaseUrl('https://demo-api-dev.arabel.la/api/');

const reducers = {
  form: formReducer,
  auth: authReducer,
  signInPage: signInPageReducer,
  signUpPage: signUpPageReducer,
  resetPasswordPage: resetPasswordPageReducer,
  requestPasswordResetPage: requestPasswordResetPageReducer,
};
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  fromJS({}),
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

authSagas.map(sagaMiddleware.run);
signInPageSagas.map(sagaMiddleware.run);
signUpPageSagas.map(sagaMiddleware.run);
signOutPageSagas.map(sagaMiddleware.run);
resetPasswordPageSagas.map(sagaMiddleware.run);
requestPasswordResetPageSagas.map(sagaMiddleware.run);

let IsAuthenticatedWrapper = (props) => {
  const {
    isAuthenticated,
    story,
  } = props;

  return (
    <main>
      {isAuthenticated && <h1>You are authenticated!</h1>}
      {!isAuthenticated && <h1>You are not authenticated!</h1>}

      <hr/>

      {story()}
    </main>
  );
};

IsAuthenticatedWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  story: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

IsAuthenticatedWrapper = connect(mapStateToProps)(IsAuthenticatedWrapper);

addDecorator((story) => (
  <IsAuthenticatedWrapper story={story} />
));

addDecorator((story) => (
  <AuthenticationProvider>
    {story()}
  </AuthenticationProvider>
));

addDecorator((story) => (
  <Provider store={store}>
    {story()}
  </Provider>
));

addDecorator((story) => (
  <IntlProvider locale="en">
    {story()}
  </IntlProvider>
));

const req = require.context('../src/', true, /\.stories\.js?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
