

![IMAGE](./coverage.svg)
[![bitHound Overall Score](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/score.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth)
[![bitHound Dependencies](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/dependencies.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth/develop/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/devDependencies.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth/develop/dependencies/npm)
[![bitHound Code](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/code.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth)

## Quick start

## Install example component in your-project
1. Run `yarn add https://bitbucket.org/arabellatech/redux-auth`
2. Add redux-auth reducer to reducers.js:
```javascript
import { reducer as authenticationReducer } from 'redux-auth';
...
export default function createReducer(asyncReducers) {
  return combineReducers({
    auth: authenticationReducer,
    ...
  });
}
```
3. Add redux-auth sagas to app.js:
```javascript
import { sagas as authenticationSagas } from 'redux-auth';
...
authenticationSagas.map(store.runSaga);
```
4. Add AuthenticationProvider provider to app.js:
```jsx
import { AuthenticationProvider } from 'redux-auth';
...
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AuthenticationProvider>
        <Router
          history={history}
          routes={rootRoute}
          render={
            applyRouterMiddleware(useScroll())
          }
        />
      </AuthenticationProvider>
    </Provider>,
    document.getElementById('app')
  );
};
```
5. Add sign in, sing up, sign out, request reset password and reset password pages to routes.js. Example of adding the sign-in page to routers:
```javascript
export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    ...,
    {
      path: '/sign-in',
      name: 'signInPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux-auth/lib/containers/SignInPage/reducer'),
          import('redux-auth/lib/containers/SignInPage/sagas'),
          import('redux-auth/lib/containers/SignInPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signInPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
  ];
}
```

## Contribution
1. Run `yarn global add getstorybook` to instal StoryBook.
2. Clone this repo using `git clone git@bitbucket.org:arabellatech/redux-auth.git`
3. Run `cd redux-auth/`
4. Run `yarn` to install dependencies.
5. Run `yarn run storybook` to start StoryBook.

## Link local package to your project
1. Run `cd redux-auth/`
2. Run `yarn link` to create a symbolic link from a global folder to the redux-auth/ folder.
3. Run `cd your-project-dir`
4. Run `yarn link redux-auth`

## Unlink local package to your project
1. Run `cd your-project-dir`
2. Run `yarn unlink redux-auth`
3. Run `yarn` to install back the repo version

## Upgrading dependencies
1. Run `yarn`
2. Commit `package.json` and `yarn.log` changes
3. Run `flow-typed install --overwrite`
4. Check if `yarn flow` returns any new errors, if not, commit `flow-typed/` changes

## Setting up new component after forking redux-auth
1. Run `git clone git@bitbucket.org:arabellatech/react-new-component.git`
2. Run `cd react-new-component`
3. Run `git remote upstream add git@bitbucket.org:arabellatech/redux-auth.git`
4. Now, after something gets updated in redux-auth (PR merge, straight commit, etc), run `git fetch upstream`
5. Run `git merge upstream/develop`
6. Changes from upstream repository should now be present in forked repository.

## Configuration

To set configuration you need to import `setConfig` function from 'redux-auth' module.

`setConfig(configuration: object)` - in the configuration object you can pass one or more configuration properties. Your configuration will be merged with default configuration.

 * userIsNotAuthenticatedRedirectPath - failure redirect path for UserIsAuthenticated auth wrapper
 * userIsNotAdminRedirectPath - failure redirect path for UserIsAdmin auth wrapper
 * userHasNoRoleRedirectPath - failure redirect path for UserHasRole auth wrapper
 * userIsAuthenticatedRedirectPath - failure redirect path for UserIsNotAuthenticated auth wrapper
 * redirectPathAfterSignIn - redirect path after successful sign in. It works until signInAuthWrapper is not specyfied by custom wrapper
 * redirectPathAfterSignUp - redirect path after successful sign up. It works until signUpAuthWrapper is not specyfied by custom wrapper
 * redirectPathAfterSignOut - redirect path after successful sign out
 * adminRole - name of admin role in the project which is used to check admin role by UserIsAdmin auth wrapper
 * signInAuthWrapper - auth wrapper which is used to check user permission on sign in page.
 * signUpAuthWrapper - auth wrapper which is used to check user permission on sign out page.

### Default configuration
```javascript
{
  userIsNotAuthenticatedRedirectPath: '/sign-in',
  userIsNotAdminRedirectPath: '/',
  userHasNoRoleRedirectPath: '/',
  userIsAuthenticatedRedirectPath: '/',
  redirectPathAfterSignIn: '/',
  redirectPathAfterSignUp: '/',
  redirectPathAfterSignOut: '/sign-in',
  adminRole: '20_example_admin',
  signInAuthWrapper: creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignIn)
  signUpAuthWrapper: creactUserIsNotAuthenticatedAuthWrapper(config.redirectPathAfterSignUp)
}
```

### signInAuthWrapper/signUpAuthWrapper

Use this property to overwrite default UserAuthWrapper HOC of sign in/up page.

#### Usage
First you need to define your custom UserAuthWrapper HOC:

```javascript

import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectUser } from 'redux-auth';

const MySignInAuthWrapper = UserAuthWrapper({
  authSelector: selectUser,
  predicate: isNotAuthenticated,
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
  wrapperDisplayName: 'MySignInAuthWrapper',
  failureRedirectPath: '/home',
});

function isNotAuthenticated(user) {
  return !user;
}

export default MySignInAuthWrapper;
```

and then you need to apply it to redux-auth configuration in your app.js file:

```javascript

import { setConfig } from 'redux-auth';
import MySignInAuthWrapper from 'containers/SignInPage/auth-wrapper';

setConfig({ signInAuthWrapper: MySignInAuthWrapper });
```
## Authentication wrappers

redux-auth module has few predefined authentication wrappers based on [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper):

 * UserIsAuthenticated - check if user is authenticated. If yes, container will be displayed and gets user data in the `authData` props. If not user will be redirect to page defined in `userIsNotAuthenticatedRedirectPath` property of the configuration. 
```javascript

import { UserIsAuthenticated } from 'redux-auth';

@UserIsAuthenticated
export default class PageOnlyForAuthenticatedUsers extends Component {...}
```
 * UserIsNotAuthenticated - check if user is not authenticated. If yes, container will be displayed. If not user will be redirect to page defined in `userIsAuthenticatedRedirectPath` property of the configuration.
```javascript

import { UserIsNotAuthenticated } from 'redux-auth';

@UserIsNotAuthenticated
export default class PageOnlyForNotAuthenticatedUsers extends Component {...}
```

You can also define you custom redirect url where user will be redirect when he/she is autheticated:

```javascript

import { UserIsNotAuthenticated } from 'redux-auth';

@UserIsNotAuthenticated('/dashboard')
export default class PageOnlyForNotAuthenticatedUsers extends Component {...}
```

 * UserIsAdmin - check if user is authenticated and has admin role (defined in `adminRole` property of the configuration). If yes, container will be displayed and gets user data in the `authData` props. If not user will be redirect to page defined in `userIsNotAdminRedirectPath` property of the configuration.
```javascript

import { UserIsAdmin } from 'redux-auth';

@UserIsAdmin
export default class PageOnlyForAdmins extends Component {...}
```
 * UserHasRole - check if user is authenticated and has one of give role. If yes, container will be displayed and gets user data in the `authData` props. If not user will be redirect to page defined in `userHasNoRoleRedirectPath` property of the configuration. 
```javascript

import { UserHasRole } from 'redux-auth';

@UserHasRole(['20_editor', '30_manager'])
export default class PageOnlyForEditorsAndManager extends PureComponent {...}
```
 
## Customization of layout

redux-auth gives you a possibility to write your own components of pages with your custom markup.

To create your custom page container you need to write your own page component and wrap it by one of these higher-order components:
 * createRequestPasswordResetContainer
 * createResetPasswordContainer
 * createSignInContainer
 * createSignUpContainer

And then you need to replace default page container in routes.js

### Example of defining custom sign in page

 1. Create sign in form component using redux-form
```jsx

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import createFormField from 'react-form-fields/lib/createFormField';
import createReduxFormField from 'react-form-fields/lib/createReduxFormField';
import {
  Field,
  reduxForm,
} from 'redux-form/immutable';
import {
  Form,
  Button,
  Icon,
  Input,
} from 'antd';
import { required as requiredValidator } from 'validators/lib/required';
import { email as emailValidator } from 'validators/lib/email';
import style from './style';

const Textfield = createReduxFormField(createFormField(Input));

const SignInForm = (props) => {
  const {
    handleSubmit,
    valid,
    loading,
  } = props;

  const onSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (valid) {
      handleSubmit();
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      noValidate
    >
      <Form.Item>
        <Field
          name="email"
          id="email"
          type="email"
          placeholder="E-mail"
          validate={[requiredValidator, emailValidator]}
          component={Textfield}
          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Field
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          validate={[requiredValidator]}
          component={Textfield}
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          size="large"
        />
      </Form.Item>
      <Form.Item style={style.lastFormItem}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!valid}
          loading={loading}
          style={style.button}
        >Sign In</Button>
      </Form.Item>
    </Form>
  );
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

SignInForm.defaultProps = {
  loading: false,
};

export default reduxForm({
  form: 'signInForm',
})(injectIntl(SignInForm));
```

2. Create sign in page container based using createSignInContainer HOC
```jsx

import React from 'react';
import PropTypes from 'prop-types';
import { createSignInContainer } from 'redux-auth';
import SignInForm from 'components/SignInForm';
import { Alert } from 'antd';
import Card from 'antd/lib/card';
import Helmet from 'react-helmet';
import style from './style';

function SignInPage(props) {
  const {
    onSubmitForm,
    SignInPage: {
      loading,
      errorMessage,
    },
  } = props;

  return (
    <div style={style.outerContainer}>
      <Helmet
        title="Physician App - Sign In"
        meta={[
          { name: 'description', content: 'Sign In' },
        ]}
      />

      <Card title="Sign in">
        { errorMessage && <Alert message={errorMessage} type="error" style={style.errorWrap} /> }
        <SignInForm loading={loading} onSubmit={onSubmitForm} />
      </Card>
    </div>
  );
}

SignInPage.propTypes = {
  SignInPage: PropTypes.object,
  onSubmitForm: PropTypes.func,
};

export default createSignInContainer(SignInPage);
```

3. Replace default sing in page container by your custom one in routes.js
```javascript
export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    ...,
    {
      path: '/sign-in',
      name: 'signInPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux-auth/lib/containers/SignInPage/reducer'),
          import('redux-auth/lib/containers/SignInPage/sagas'),
          import('containers/SignInPage'), // <- put path to your custom container here
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signInPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
  ];
}
```

## Selectors
 * selectUser - selects user data from redux store
 * selectIsAuthenticated - selects boolean value from redux store indicate whether or not a user is authenticated true of false 
## Actions
 * setTokenAction - takes as an argument token and returns action, which dispatched to store the set token, parse JWT token and set user data, isAuthenticated flag to true and run interval to refresh token 30s before its expired. 
 * clearTokenAction - returns clear token action which clear token, clear user data and set isAuthenticated flag to false in redux store
 * refreshTokenAction - returns refresh token action
