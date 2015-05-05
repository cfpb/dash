# Dash

[![Build Status](https://travis-ci.org/cfpb/dash.svg?branch=master)](https://travis-ci.org/cfpb/dash) [![Coverage Status](https://coveralls.io/repos/cfpb/dash/badge.svg?branch=master)](https://coveralls.io/r/cfpb/dash?branch=master)

## Installation

* `npm install -g gulp bower jest-cli browserify`
* `./frontendbuild.sh`

## Testing

* `npm test`

[Jest](http://facebook.github.io/jest/) is used. Tests are located in `__test__` directories in `src`.

## Developing

After you've set up [`devdash`](https://github.com/cfpb/devdash#installation) so that [http://localhost:8000](http://localhost:8000) is correctly serving DevDash, you may use the following commands:

* `npm test` to run ESLint and Jest tests.
* `gulp build` process source files and dump them into `dist/` for production use and `dev/` for dev use.
* `gulp build --watch` to monitor JS/Less files and automatically process them when changed.

## Build

* Run `gulp` to run tests and build everything (it runs `npm test` and `gulp build` from above).
