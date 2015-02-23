Installation
------------

* `npm install -g gulp`
* `npm install -g bower`
* `npm install -g jest-cli`
* `npm install .`

Testing
-------

* `npm test`

Developing
----------
To create a new set of javascript and css files:

* create a new directory in ./manifests
* place a bower.json in that directory

    # bower.json
    {
      "name": "portal",
      ...
      "include": {
        "js": ["path1", "path2"...],
        "jsx": ["path1", "path2"...],
        "css": [...]
      }
    }

* use the shim at src/dev_shim to seemlessly import all constituent files during development
* development files must be served by a webserver. 
  You can use `python -m SimpleHTTPServer 8000` to do so.

Build
-----
* run `gulp` to build the minified files in the `./build` directory.


Dependencies
------------
Specify dependencies in your bower.json.
When you modify dependencies,
enter the directery with you bower.json and run `bower install`.
This will install the dependencies to /dependencies.