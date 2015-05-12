#!/bin/sh

echo "node $(node --version)"
echo "npm $(npm --version)"
echo "gulp $(gulp --version)"
echo "browserify $(browserify --version)"

npm install
gulp
