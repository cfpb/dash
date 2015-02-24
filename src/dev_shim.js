(function(){
var onload_handlers = []
// From https://github.com/yanatan16/nanoajax
// MIT License
!function(e,t){function n(){if(t.XMLHttpRequest)return new t.XMLHttpRequest;try{return new t.ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(e){}}t.nanoajax=e,e.ajax=function(e,t,r){r||(r=t,t=null);var u=n();return u?(u.onreadystatechange=function(){4==u.readyState&&r(u.status,u.responseText)},t?(u.open("POST",e,!0),u.setRequestHeader("X-Requested-With","XMLHttpRequest"),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded")):u.open("GET",e,!0),void u.send(t)):r(new Error("no request"))}}({},function(){return this}());
// End from https://github.com/yanatan16/nanoajax

function add_script(path, type, callback){
  var script = document.createElement('SCRIPT');
  script.setAttribute('src', path);
  script.setAttribute('type', type||'text/javascript');
  script.onload=function(){
    return callback();
  }

  document.body.appendChild(script);
  return script;
}

function get_path(base_static_path, obj){
  return (base_static_path||'') + (obj.path||obj);
}

function add_stylesheet(path, type, callback){
  var link = document.createElement('LINK');
  link.setAttribute('href', path);
  link.setAttribute('type', type||'text/css');
  link.setAttribute("rel", "stylesheet");
  link.onload=function(){
    return callback();
  }

  document.body.appendChild(link);
  return link;
}

function add_scripts(type) {
  return function(paths, base_static_path, callback){
    var i = 0;
    var count = paths.length;

    var handle_add = function() {
      if (i >= count) {
        return callback();
      }
      var path = get_path(base_static_path, paths[i++]);
      add_script(path, type, handle_add);
      
    }
    handle_add();
  }
}

function add_stylesheets(type) {
  return function(paths, base_static_path, callback){
    var dom_elms = [];
    var count = paths.length;
    if (!count) {callback(); return dom_elms;}
    for(var i=0,j=paths.length;i<j;i++){
      var path = get_path(base_static_path, paths[i]);
      dom_elms.push(add_stylesheet(path, type, function() {if (--count <= 0) {return callback()}}));
    }
    return dom_elms;
  }
}

function find_script_that_contains(text){
  var scripts = document.getElementsByTagName('script');
  for(var i=0,j=scripts.length;i<j;i++){
    if(scripts[i].src.indexOf(text) > -1)
      return scripts[i];
  }
}

function add_jsx(paths, base_static_path, callback) {
  var count = paths.length;
  if (!count) {callback(); return dom_elms;}
  for(var i=0,j=paths.length;i<j;i++){
    var path = get_path(base_static_path, paths[i]);
    nanoajax.ajax(path, function (code, responseText) {
      var transform = function() {
        if (typeof window.JSXTransformer !== 'undefined') {
          var code = responseText.replace(/^.*require\(.*\).*$/mg, '')
          JSXTransformer.exec(code);
          if (--count <= 0) {return callback()}
        } else {
          setTimeout(transform, 10);
        }
      }
      transform();
    });
  }
}

// file type definitions
add_type = {
  "js": add_scripts("text/javascript"),
  "jsx": add_jsx,
  "css": add_stylesheets("text/css"),
}

function load_manifest(file_name, base_static_path, callback){
  nanoajax.ajax(base_static_path + "manifests/" + file_name + "/bower.json", function (code, responseText) {
    var manifest = JSON.parse(responseText);
    var types = manifest.include || {};
    var count = 0;
    for (type in types) {count++;}
    for (type in types) {
      var paths = manifest.include[type];
      if (!add_type[type]) {continue;}
      add_type[type](paths, base_static_path, function() {if (--count <= 0) {return callback()}});
    }
  })
}

function load_manifests(file_names, base_static_path, callback) {
  var count = file_names.length;
  if (!count) {callback(); return dom_elms;}
  file_names.forEach(function(file_name) {
    load_manifest(file_name, base_static_path, function() {
      if (--count <= 0) {
        if (callback) {callback();}
        return handle_onload()
      }
    });
  });
}

window.load_manifests = load_manifests;

// monkeypatch jquery onload
window.patch_jquery = function() {
  window.$ = function(callback) {
    if (arguments.length > 1 || typeof callback !== 'function') {
      throw Error('Until JQuery is loaded, you can only use on onready shortcut: $(function {}).');
    }
    onload_handlers.push(callback);
  }
}


function handle_onload() {
  if (document.readyState == "complete") {
    onload_handlers.forEach(function(handler) {
      handler();
    });
  } else {
    $(function() {
      onload_handlers.forEach(function(handler) {
        handler();
      });
    })
  }
}

})();
