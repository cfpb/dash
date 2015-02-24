var concat = require('gulp-concat');
var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs');
var order = require("gulp-order");
var merge = require('merge-stream');


function load_manifest(file_name, callback) {
  file_path = './manifests/' + file_name + '/bower.json';
  fs.readFile(file_path, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    try {
      var manifest = JSON.parse(data);
    } catch (e) {
      throw Error('invalid json in ' + file_name + ' manifest.');
    }
    for (typ in (manifest.include || {})) {
      var new_paths = [];
      var paths = manifest.include[typ];
      paths.forEach(function(path) {
        if (!path.dev) {
          new_paths.push(path);
        }
      });
      manifest.include[typ] = new_paths;
    }
    return callback(null, manifest);
  });
}

function build_initial_pipe(manifest, initial_pipelines, middle_pipeline) {
  initial_pipes = [];

  for (typ in initial_pipelines) {
    var partial_pipe = initial_pipelines[typ];
    if (manifest.include[typ]) {
      var initial_pipe = gulp.src(manifest.include[typ])
      if (partial_pipe) {
        initial_pipe.pipe(partial_pipe());
      }
      initial_pipes.push(initial_pipe);
    }
  }
  var initial_pipe = merge(initial_pipes);
  if (middle_pipeline) {
    initial_pipe.pipe(middle_pipeline());
  }
  return initial_pipe;
}


function build(extension, initial_pipelines, middle_pipeline) {
  return function(end) {
    get_manifest_paths(function (err, file_names) {
      var count = file_names.length;
      file_names.forEach(function(file_name) {
        load_manifest(file_name, function(err, manifest){
          if (err) {
            throw err;
          }
          return build_initial_pipe(manifest, initial_pipelines, middle_pipeline)
            .pipe(order(get_ordered_paths(manifest, initial_pipelines), {base: '.'}))
            .pipe(concat(file_name  + '.' + extension))
            .pipe(gulp.dest('./build/' + extension + '/'))
            .on('end', function() {
              console.log('count', count);
              if (--count <= 0) {
                return end();
              }
            })
        });
      })
    })
  }
}

function get_ordered_paths(manifest, partial_pipes) {
  var ordered_paths = [];
  for (typ in (manifest.include || {})) {
    if (typ in partial_pipes) {
      ordered_paths = ordered_paths.concat(manifest.include[typ]);
    }
  }
  return ordered_paths;
}

function get_manifest_paths(callback) {
  if (argv.name) {
    return callback(null, [argv.name]);
  }
  else {
    fs.readdir('./manifests', callback);
  }
}

module.exports = {
  build: build,
}
