var ReactTools = require('react-tools');
module.exports = {
  process: function(src, file) {
    // We really only care about JSX and React test files
    if (/\.jsx$/.test(file) || /\-test\.js$/.test(file) || /typeahead\/.*$/.test(file)) {
      return ReactTools.transform(src);
    }
    return src;
  }
};
