Installation
------------

* `npm install -g gulp bower jest-cli browserify watchify`
* `./frontendbuild.sh`

Testing
-------

* `npm test`

Developing
----------

* Set up [`devdash`](https://github.com/cfpb/devdash#installation) so that http://localhost:8000 is correctly serving DevDash.
* Run `npm run watch`. When files are edited, tests will be run and this repo will be copied over to the `devdash` directory to be served by nginx.

Build
-----
* run `gulp` to build the minified files into the `dist` directory.


Dependencies
------------
Specify dependencies in your bower.json.
When you modify dependencies,
enter the directery with you bower.json and run `bower install`.
This will install the dependencies to /dependencies.
