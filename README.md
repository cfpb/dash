Installation
------------

* `npm install -g gulp bower jest-cli`
* `./frontendbuild.sh`

Testing
-------

* `npm test`

Developing
----------

* `cd src`
* `python -m SimpleHTTPServer 8000`

If you're editing JavaScript, run `npm run watch` in a new tab to have Browserify auto-recompile files.

Build
-----
* run `gulp` to build the minified files into the `dist` directory.


Dependencies
------------
Specify dependencies in your bower.json.
When you modify dependencies,
enter the directery with you bower.json and run `bower install`.
This will install the dependencies to /dependencies.
