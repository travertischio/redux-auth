## Quick start

## Install example component in your-project
1. Run `yarn add https://bitbucket.org/arabellatech/react-sample-component`

## Contribution
1. Run `yarn global add getstorybook` to instal StoryBook.
1. Clone this repo using `git clone git@bitbucket.org:arabellatech/react-sample-component.git`
1. Run `cd react-sample-component/`
1. Run `yarn` to install dependencies.
1. Run `yarn run storybook` to start StoryBook.

## Link local package to your project
1. Run `cd react-sample-component/`
1. Run `yarn link` to create a symbolic link from a global folder to the react-sample-component/ folder.
1. Run `cd your-project-dir`
1. Run `yarn link react-sample-component`

## Unlink local package to your project
1. Run `cd your-project-dir`
1. Run `yarn unlink react-sample-component`
1. Run `yarn` to install back the repo version

## Upgrading dependencies
1. Run `yarn`
1. Commit `package.json` and `yarn.log` changes
1. Run `flow-typed install --overwrite`
1. Check if `yarn flow` returns any new errors, if not, commit `flow-typed/` changes

## Setting up new component after forking react-sample-component
1. Run `git clone git@bitbucket.org:arabellatech/react-new-component.git`
1. Run `cd react-new-component`
1. Run `git remote upstream add git@bitbucket.org:arabellatech/react-sample-component.git`
1. Now, after something gets updated in react-sample-component (PR merge, straight commit, etc), run `git fetch upstream`
1. Run `git merge upstream/develop`
1. Changes from upstream repository should now be present in forked repository.
