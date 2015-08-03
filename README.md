# Dash

[![Build Status](https://img.shields.io/travis/cfpb/dash/master.svg?style=flat-square)](https://travis-ci.org/cfpb/dash) [![Coverage Status](https://img.shields.io/coveralls/cfpb/dash/master.svg?style=flat-square)](https://coveralls.io/r/cfpb/dash?branch=master) [![Dependency Status](https://img.shields.io/david/cfpb/dash/master.svg?style=flat-square)](https://david-dm.org/cfpb/dash)

## Installation

* `npm install -g gulp bower jest-cli browserify`
* `./frontendbuild.sh`

## Testing

* `npm test`

[Jest](http://facebook.github.io/jest/) requires Node v0.10 :expressionless:. Tests are located in `__test__` directories in `src`.

## Developing

First, set up [DevDash](https://github.com/cfpb/devdash#installation). You may use the following commands:

* `gulp build` to process source files and dump them into `dist/` for production.
* `gulp build --watch` to monitor JS/Less files and build when changed.

## Build

* Run `gulp` to run tests and build everything.
