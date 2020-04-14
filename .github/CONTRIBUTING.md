# simple-web-service Contributing Guide

Hi! I’m really excited that you are interested in contributing to
simple-web-service. Before submitting your contribution though, please make sure
to take a moment and read through the following guidelines.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)

## Issue Reporting Guidelines

- Take a moment to correctly fill the template provided by github.

## Pull Request Guidelines

- The `master` branch is basically just a snapshot of the latest stable release.
  All development should be done in dedicated branches.
  **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `dev`, and merge back
  against that branch.

- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - we will let
  GitHub automatically squash it before merging.

- Make sure `npm test` passes. (see [development setup](#development-setup))

- If adding new feature:
  - Add accompanying test case.
  - Provide convincing reason to add this feature. Ideally you should open a
    suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxx])` (#xxxx is the
    issue id) in your PR title for a better release log, e.g.
    `update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

## Development Setup

You will need [Node.js](http://nodejs.org) **version 6+**.

After cloning the repo, run:

``` bash
$ npm install
```

### Committing Changes

Commit messages should follow the
[commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be
automatically generated. Commit messages will be automatically validated upon
commit. If you are not familiar with the commit message convention, you can use
`npm run commit` instead of `git commit`, which provides an interactive CLI for
generating proper commit messages.

## Project Structure

- **`doc`**: contains all documentation refered to this project.

  - `doc/errors.md`: all error codes are described in this file.

- **`packages`**: contains `vue-server-renderer` and `vue-template-compiler`,
  which are distributed as separate NPM packages. They are automatically
  generated from the source code and always have the same version with the main
  `vue` package.

- **`src`**: contains the source code. The codebase is written in typescript.

  - **`index`**: reads the provided variables and calls the simple web service.

  - **`simple_web_Service`**: contains universal, platform-agnostic runtime
    code.

## Credits

Thank you to all the people who have already contributed to simple-web-service!

## Attribution

This Contributing Guide is adapted from the [Vue Contributing Guide](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md).
