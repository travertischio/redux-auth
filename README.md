![IMAGE](./coverage.svg)
[![bitHound Overall Score](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/score.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth)
[![bitHound Dependencies](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/dependencies.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth/develop/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/devDependencies.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth/develop/dependencies/npm)
[![bitHound Code](https://www.bithound.io/bitbucket/arabellatech/redux-auth/badges/code.svg)](https://www.bithound.io/bitbucket/arabellatech/redux-auth)

## Quick start

## Install example component in your-project
1. Run `yarn add https://bitbucket.org/arabellatech/redux-auth`

## Contribution
1. Run `yarn global add getstorybook` to instal StoryBook.
1. Clone this repo using `git clone git@bitbucket.org:arabellatech/redux-auth.git`
1. Run `cd redux-auth/`
1. Run `yarn` to install dependencies.
1. Run `yarn run storybook` to start StoryBook.

## Link local package to your project
1. Run `cd redux-auth/`
1. Run `yarn link` to create a symbolic link from a global folder to the redux-auth/ folder.
1. Run `cd your-project-dir`
1. Run `yarn link redux-auth`

## Unlink local package to your project
1. Run `cd your-project-dir`
1. Run `yarn unlink redux-auth`
1. Run `yarn` to install back the repo version

## Upgrading dependencies
1. Run `yarn`
1. Commit `package.json` and `yarn.log` changes
1. Run `flow-typed install --overwrite`
1. Check if `yarn flow` returns any new errors, if not, commit `flow-typed/` changes

## Setting up new component after forking redux-auth
1. Run `git clone git@bitbucket.org:arabellatech/react-new-component.git`
1. Run `cd react-new-component`
1. Run `git remote upstream add git@bitbucket.org:arabellatech/redux-auth.git`
1. Now, after something gets updated in redux-auth (PR merge, straight commit, etc), run `git fetch upstream`
1. Run `git merge upstream/develop`
1. Changes from upstream repository should now be present in forked repository.

## Configuration
### signInAuthWrapper

Use this property to overwrite default UserAuthWrapper HOC of sign in page.

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

