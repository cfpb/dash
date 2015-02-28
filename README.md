Installation
------------

* `npm install -g gulp bower jest-cli browserify`
* `./frontendbuild.sh`

Testing
-------

* `npm test`

Developing
----------

* Set up [`devdash`](https://github.com/cfpb/devdash#installation) so that [http://localhost:8000](http://localhost:8000) is correctly serving DevDash.
* `cd` back to this repo and `npm run watch`

When files are edited, tests will be run and this repo will be copied over to the `devdash` directory to be served by nginx. Reload http://localhost:8000 to see your changes.

Build
-----
* Run `gulp` to build the minified files into the `dist` directory.

Dependencies
------------
Specify dependencies in your bower.json.
When you modify dependencies,
enter the directery with you bower.json and run `bower install`.
This will install the dependencies to /dependencies.
