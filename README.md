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
* `gulp build` to process and optimize all JavaScript and Less file and dump them into `dist/` for production use.
* `gulp build --dev` to *quickly* process all JS and Less files and dump them into `dist/` (code won't be minified).
* `gulp build --watch` to monitor source files and automatically `gulp build --dev` when any files are changed.


When files are edited, tests will be run and this repo will be copied over to the `devdash` directory to be served by nginx. Reload http://localhost:8000 to see your changes.

## Build

* Run `gulp` to build the minified files into the `dist` directory.
