## Quick start

## Install example component in your-project
1. Run `yarn add https://bitbucket.org/arabellatech/arc-sample`

## Contribution
1. Run `npm i -g getstorybook` to instal StoryBook.
1. Clone this repo using `git clone git@bitbucket.org:arabellatech/arc-sample.git`
1. Run `cd arc-sample/`
1. Run `yarn` to install dependencies.
1. Run `yarn run storybook` to start StoryBook.

## Link local package to your project
1. Run `cd arc-sample/`
1. Run `yarn link` to create a symbolic link from a global folder to the arc-sample/ folder.
1. Run `cd your-project-dir`
1. Run `yarn link arc-sample`

## Unlink local package to your project
1. Run `cd your-project-dir`
1. Run `yarn unlink arc-sample`
1. Run `yarn` to install back the repo version

## Upgrading dependencies
1. Run `yarn`
1. Commit `package.json` and `yarn.log` changes
1. Run `flow-typed install --overwrite`
1. Check if `yarn flow` returns any new errors, if not, commit `flow-typed/` changes
