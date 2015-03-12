# Owning a Home

[![Build Status](https://travis-ci.org/contolini/dash.svg?branch=master)](https://travis-ci.org/contolini/dash) [![Coverage Status](https://coveralls.io/contolini/contolini/dash/badge.svg)](https://coveralls.io/r/contolini/dash)

# Installation

* `npm install -g gulp bower jest-cli browserify`
* `./frontendbuild.sh`

# Testing

* `npm test`

# Developing

* Set up [`devdash`](https://github.com/cfpb/devdash#installation) so that [http://localhost:8000](http://localhost:8000) is correctly serving DevDash.
* `cd` back to this repo and `npm run watch`

When files are edited, tests will be run and this repo will be copied over to the `devdash` directory to be served by nginx. Reload http://localhost:8000 to see your changes.

# Build
* Run `gulp` to build the minified files into the `dist` directory.
